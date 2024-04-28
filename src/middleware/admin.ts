import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utiles/httperrors";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const role = req.user.role;

  if (role == "ADMIN") {
    next();
  } else {
    throw new BadRequestError(role, "You are not Admin");
  }
};
