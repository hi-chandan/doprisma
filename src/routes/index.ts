import { Router } from "express";
import authRouter from "./auth";

const rootRouter: Router = Router();
rootRouter.use("/auth", authRouter);

export default rootRouter;
