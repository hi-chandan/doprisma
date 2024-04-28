import { Router } from "express";
import { wrapper } from "../utiles/wrapper";
import { getaccess } from "../middleware/user-auth";
import { addresscontrol } from "../controller/user-address-contorl";

const addressRouter: Router = Router();

addressRouter.post(
  "/address",
  wrapper(getaccess),
  wrapper(addresscontrol.addAddress.bind(addresscontrol)),
);
addressRouter.delete(
  "/address",
  wrapper(getaccess),
  wrapper(addresscontrol.deleteAddress.bind(addresscontrol)),
);
addressRouter.get(
  "/list",
  wrapper(getaccess),
  wrapper(addresscontrol.listAddress.bind(addresscontrol)),
);
addressRouter.put(
  "/list/:id",
  wrapper(getaccess),
  wrapper(addresscontrol.singleUpdate.bind(addresscontrol)),
);

export default addressRouter;
