import { Router } from "express";
import { wrapper } from "../utiles/wrapper";
import { authController } from "../controller/auth-controller";
import { getaccess } from "../middleware/user-auth";
const authRouter: Router = Router();

authRouter.post(
  "/signup",
  //   wrapper((req) => authController.signup(req))
  wrapper(authController.signup.bind(authController)),
);
authRouter.post(
  "/login",
  //   wrapper((req) => authController.signup(req))
  wrapper(authController.login.bind(authController)),
);

authRouter.get(
  "/me",
  getaccess,
  wrapper(authController.me.bind(authController)),
);
authRouter.put(
  "/update",
  getaccess,
  wrapper(authController.update.bind(authController)),
);

authRouter.post(
  "/userupdate",
  wrapper(getaccess),
  wrapper(authController.updateUser.bind(authController)),
);
export default authRouter;
