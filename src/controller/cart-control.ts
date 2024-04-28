import { Request, Response } from "express";
import { CartService, cartService } from "../services/cart-service";
import { HttpRes } from "../utiles/httpres";

export class CartController {
  constructor(private cartService: CartService) {}

  async addCart(req: Request, res: Response) {
    const body = req.body;
    const userId = req.user.id;
    const addCart = await this.cartService.addCart(body, userId);

    return HttpRes.ok(addCart, "product added into Cart");
  }
  async deleteCart(req: Request, res: Response) {
    const cartId = req.params.id;
    const userId = req.user.id;
    const deleteItem = await this.cartService.deleteCart(cartId, userId);

    return HttpRes.ok(deleteItem, "item is deleted");
  }
  async updateCart(req: Request, res: Response) {
    const cartId = req.params.id;
    const data = req.body.quantity;
    const userId = req.user.id;

    const updateCart = await this.cartService.updateCart(data, cartId, userId);

    return HttpRes.ok(updateCart, "item is deleted");
  }
  async getCart(req: Request, res: Response) {
    const userId = req.user.id;
    const getCart = await this.cartService.getCart(userId);

    return HttpRes.ok(getCart, "All Cart Product");
  }
}

export const cartControl = new CartController(cartService);
