import { PrismaClient, User } from "@prisma/client";
export const prisma = new PrismaClient();

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
