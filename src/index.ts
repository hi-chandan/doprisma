import express from "express";
import { PORT } from "./secrets";
<<<<<<< HEAD
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import { errorHandler } from "./middleware/errorhandler";
import { prisma } from "./config/db-config";
import productRouter from "./routes/product-router";
import addressRouter from "./routes/address-router";
import cartRouter from "./routes/cart-router";
async function main() {
  await prisma.$connect();

  const app = express();

  app.use(cookieParser());
  app.use(express.json());

  app.use("/api", authRouter, productRouter, addressRouter, cartRouter);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log("server is working");
  });
}

main();
=======
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { SignupSchema } from "./schema/auth";
// import { errorHandler } from "./error-handler";
import { errorHandler } from "./middleware/errorhandler";

const app = express();
app.use(express.json());

app.use("/api", rootRouter);
export const prismaCilent = new PrismaClient({ log: ["query"] }).$extends({
  query: {
    user: {
      create({ args, query }) {
        args.data = SignupSchema.parse(args.data);
        return query(args);
      },
    },
  },
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log("server is working");
});
>>>>>>> 01e9a1c70a3e400f3647ee66bef6c1a137f5d7b8
