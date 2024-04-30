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

      return order;
    });
  }
  async listOrder(userId: any) {
    const listOrder = await this.orderModel.findMany({
      where: {
        userId: userId,
      },
    });

    if (listOrder.length == 0) {
      throw new BadRequestError("Not Order Yet");
    }

    return listOrder;
  }
  async cancelOrder(userId: any, orderId: any) {
    const isUserOrder = await this.orderModel.findMany({
      where: { userId: userId },
    });

    if (isUserOrder.length == 0) {
      throw new BadRequestError("No Order in OrderList");
    }

    console.log("This is isUserOrder", isUserOrder.length);

    // const findorder = await this.orderModel.update({
    //   where: {
    //     id: orderId,
    //   },
    //   data: {
    //     status: "CANCELLED",
    //   },
    // });

    // return cancelOrder;
  }
  async getOrderById() {}
}

export const orderService = new OrderService(
  prisma.order as any,
  prisma.orderEvent as any,
);
