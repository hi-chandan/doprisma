import { PrismaClient } from "@prisma/client";
import { prisma } from "../config/db-config";
import { BadRequestError } from "../utiles/httperrors";

export class CartService {
  constructor(private cartModel: PrismaClient["cartItem"]) {}

  async addCart(data: any, userId: any) {
    const checkProductId = await this.cartModel.findMany({
      where: { productId: data.productId },
    });

    if (checkProductId.length > 0) {
      throw new BadRequestError("Product is already added to Cart");
    }

    const addCart = await this.cartModel.create({
      data: {
        ...data,
        userId: userId,
      },
    });

    if (!addCart) {
      throw new BadRequestError("unable to add in cart");
    }
    return addCart;
  }
  async deleteCart(cartId: any, userId: string) {
    const isexisted = await this.cartModel.findUnique({
      where: { id: cartId },
    });
    if (!isexisted) {
      throw new BadRequestError("not such item is added to Cart");
    }

    if (isexisted.userId != userId) {
      throw new BadRequestError("can't change other user cart");
    }

    const deleteItem = await this.cartModel.delete({ where: { id: cartId } });
    if (!deleteItem) {
      throw new BadRequestError("delete unsuccessful");
    }
    return deleteItem;
  }
  async updateCart(data: any, cartId: any, userId: string) {
    const isexisted = await this.cartModel.findUnique({
      where: { id: cartId },
    });
    if (!isexisted) {
      throw new BadRequestError("not such item is added");
    }
    if (isexisted.userId != userId) {
      throw new BadRequestError("can't change other user cart");
    }
    const updateCart = await this.cartModel.update({
      where: { id: cartId },
      data: {
        quantity: data,
      },
    });

    if (!updateCart) {
      throw new BadRequestError("update unsuccessful");
    }

    return updateCart;
  }
  async getCart(userId: string) {
    const allItem = await this.cartModel.findMany({
      where: { userId: userId },
      include: {
        product: true,
      },
    });

    if (allItem.length == 0) {
      throw new BadRequestError("Your Cart is empty");
    }

    return allItem;
  }
}

export const cartService = new CartService(prisma.cartItem);
