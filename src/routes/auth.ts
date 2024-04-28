import { Router } from "express";
<<<<<<< HEAD
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
=======
import { login, signup } from "../controller/auth";
import { wrapper } from "../utiles/wrapper";
const authRouter: Router = Router();

authRouter.post("/signup", wrapper(signup));
authRouter.post("/login", login);
>>>>>>> 01e9a1c70a3e400f3647ee66bef6c1a137f5d7b8
export default authRouter;
