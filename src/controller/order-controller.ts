import { Request, Response } from "express";
import { OrderService, orderService } from "../services/order-service";
import { HttpRes } from "../utiles/httpres";

export class OrderControl {
  constructor(private orderService: OrderService) {}
  async createOrder(req: Request, res: Response) {
    const userId = req.user.id;
    const defaultAddress = req.user.defaultShippingAddress;
    const orderCreate = await this.orderService.createOrder(
      userId,
      defaultAddress,
    );

    return HttpRes.ok(orderCreate, "Order is Created");
  }
  async listOrder(req: Request, res: Response) {
    const userId = req.user.id;
    const listOrder = await this.orderService.listOrder(userId);

    return HttpRes.ok(listOrder, "your all Order");
  }
  async cancelOrder(req: Request, res: Response) {
    const userId = req.user.id;
    const orderId = req.params.id;
    console.log("This is orderId", orderId, userId);
    const CancelOrder = await this.orderService.cancelOrder(userId, orderId);

    return HttpRes.ok(CancelOrder, "your order is Cancel");
  }
  async getOrderById(req: Request, res: Response) {
    const orderId = req.params.id;
    const getOrderbyId = await this.orderService.getOrderById(orderId);

    return HttpRes.ok(getOrderbyId, "your order ");
  }
}

export const orderControl = new OrderControl(orderService);

// id   String   @id @default(auto()) @map("_id") @db.ObjectId
// userId String @db.ObjectId
// user User @relation(fields: [userId], references: [id])
// netAmount Int
// address String
// status OrderEventStatus @default(PENDING)
// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt
