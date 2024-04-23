import { Router } from "express";
import { login, signup } from "../controller/auth";
import { wrapper } from "../utiles/wrapper";
const authRouter: Router = Router();

authRouter.post("/signup", wrapper(signup));
authRouter.post("/login", login);
export default authRouter;
