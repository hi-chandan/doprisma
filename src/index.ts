import express from "express";
import { PORT } from "./secrets";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import { errorHandler } from "./middleware/errorhandler";
import { prisma } from "./config/db-config";
import productRouter from "./routes/product-router";
import addressRouter from "./routes/address-router";
import cartRouter from "./routes/cart-router";
import orderRouter from "./routes/order-router";
async function main() {
  await prisma.$connect();

  const app = express();

  app.use(cookieParser());
  app.use(express.json());

  app.use(
    "/api",
    authRouter,
    productRouter,
    addressRouter,
    cartRouter,
    orderRouter,
  );

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log("server is working");
  });
}

main();
