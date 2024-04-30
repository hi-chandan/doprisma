import { PrismaClient, User } from "@prisma/client";
export const prisma = new PrismaClient({}).$extends({
  result: {
    address: {
      formattedAddress: {
        needs: {
          lineone: true,
          city: true,
          country: true,
          pincode: true,
        },
        compute: (addr) => {
          return `${addr.lineone},${addr.city},${addr.country},${addr.pincode}`;
        },
      },
    },
  },
});

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
