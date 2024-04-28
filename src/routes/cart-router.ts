import { Router } from "express";
import { wrapper } from "../utiles/wrapper";
import { cartControl } from "../controller/cart-control";
import { getaccess } from "../middleware/user-auth";

const cartRouter: Router = Router();

cartRouter.post(
  "/addCart",
  wrapper(getaccess),
  wrapper(cartControl.addCart.bind(cartControl)),
);
cartRouter.delete(
  "/deleteItem/:id",
  wrapper(getaccess),
  wrapper(cartControl.deleteCart.bind(cartControl)),
);
cartRouter.put(
  "/updateItem/:id",
  wrapper(getaccess),
  wrapper(cartControl.updateCart.bind(cartControl)),
);
cartRouter.get(
  "/allItem",
  wrapper(getaccess),
  wrapper(cartControl.getCart.bind(cartControl)),
);
export default cartRouter;
