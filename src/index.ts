import express from "express";
import { PORT } from "./secrets";
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
