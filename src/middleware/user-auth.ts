import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prisma } from "../config/db-config";
import { NotFoundError } from "../utiles/httperrors";
import { Payload } from "@prisma/client/runtime/library";

export const getaccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.cookies;

  if (!token) {
    throw new NotFoundError("User login first");
  }
  // Verify the token and cast it to JwtPayload
  const userId = jwt.verify(token, JWT_SECRET) as any;

  // Extract the userid from the decoded payload

  // Find the user in the database using the userid
  const user = await prisma.user.findUnique({ where: { id: userId } });

  // Handle if user is not found
  if (!user) {
    throw new NotFoundError("user not valid");
    // throw new Error("user is not login");
  }
  req.user = user;
  next();

  // User found, do something with user...
};
