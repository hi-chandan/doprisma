import { PrismaClient } from "@prisma/client";
import { prisma } from "../config/db-config";
import { BadRequestError } from "../utiles/httperrors";

export class OrderService {
  constructor(
    private orderModel: PrismaClient["order"],
    private orderEvent: PrismaClient["orderEvent"],
  ) {}
  async createOrder(userId: any, defaultAddress: any) {
    return await prisma.$transaction(async (tx) => {
      if (!defaultAddress) {
        throw new BadRequestError("Please select the default address");
      }
      const cartItem = await tx.cartItem.findMany({
        where: {
          userId: userId,
        },
        include: {
          product: true,
        },
      });
      if (cartItem.length == 0) {
        throw new BadRequestError("cart is empty");
      }

      const TotalPrice = cartItem.reduce((pre, current) => {
        const productPrice = current.product.price;
        const subtotal = current.quantity * productPrice;
        return pre + subtotal;
      }, 0);

      const address = await tx.address.findFirst({
        where: {
          id: defaultAddress,
        },
      });

      if (!address) {
        throw new BadRequestError("Select default Address");
      }

      const order = await tx.order.create({
        data: {
          userId: userId,
          netAmount: TotalPrice,
          address: address?.formattedAddress ?? "Default address",
          products: {
            create: cartItem.map((cart) => {
              return {
                productId: cart.productId,
                quantity: cart.quantity,
              };
            }),
          },
        },
      });

      const orderEvent = await tx.orderEvent.create({
        data: {
          orderId: order.id,
        },
      });

      await tx.cartItem.deleteMany({
        where: {
          userId: userId,
        },
      });

      const CreateOrder = {
        order,
        orderEvent,
      };

      return CreateOrder;
    });
  }
  async listOrder(userId: any) {
    const listOrder = await this.orderModel.findMany({
      where: {
        userId: userId,
      },
      include: {
        event: true,
      },
    });

    if (listOrder.length == 0) {
      throw new BadRequestError("Not Order Yet");
    }

    return listOrder;
  }
  async cancelOrder(userId: any, orderId: any) {
    const isUserOrder = await this.orderModel.findUniqueOrThrow({
      where: { userId: userId, id: orderId },
    });

    if (!isUserOrder) {
      throw new BadRequestError("Order Id is wrong");
    }

    const updateOrder = await this.orderModel.update({
      where: {
        id: isUserOrder.id,
      },
      data: {
        status: "CANCELLED",
      },
    });

    const updateOrderEvent = await this.orderEvent.findFirstOrThrow({
      where: {
        orderId: isUserOrder.id,
      },
    });

    if (!updateOrderEvent) {
      throw new BadRequestError("No Order Event ");
    }

    const updateEvent = await this.orderEvent.update({
      where: {
        id: updateOrderEvent.id,
      },
      data: {
        status: "CANCELLED",
      },
    });

    const allUpdate = {
      updateOrder,
      updateEvent,
    };

    return allUpdate;
  }
  async getOrderById(orderId: any) {
    console.log("This is orderId", orderId);
    const getOrder = await this.orderModel.findUniqueOrThrow({
      where: {
        id: orderId,
      },
    });

    console.log("this is getOrder", getOrder);

    if (!getOrder) {
      throw new BadRequestError("Order not found");
    }

    return getOrder;
  }
}

export const orderService = new OrderService(
  prisma.order as any,
  prisma.orderEvent as any,
);
