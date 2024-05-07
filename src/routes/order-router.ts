import { Router } from "express";
import { wrapper } from "../utiles/wrapper";
import { getaccess } from "../middleware/user-auth";
import { orderControl } from "../controller/order-controller";

const orderRouter: Router = Router();

orderRouter.post(
  "/order",
  wrapper(getaccess),
  wrapper(orderControl.createOrder.bind(orderControl)),
);
orderRouter.get(
  "/orderList",
  wrapper(getaccess),
  wrapper(orderControl.listOrder.bind(orderControl)),
);
orderRouter.put(
  "/orderCancel/:id",
  wrapper(getaccess),
  wrapper(orderControl.cancelOrder.bind(orderControl)),
);
orderRouter.get(
  "/Order/:id",
  wrapper(getaccess),
  wrapper(orderControl.getOrderById.bind(orderControl)),
);
export default orderRouter;
