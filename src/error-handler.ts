import { Request, Response, NextFunction } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { ZodError } from "zod";
export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      if (error instanceof HttpException) {
        return res.status(error.statusCode).json({
          message: error.message,
          error: error.errors,
          ErrorCode: error.errorCode,
        });
      } else {
        if (error instanceof ZodError) {
          console.log("This is error", error);
          return res.status(400).json({
            error: error?.issues,
          });
        } else {
          return res.json({
            message: "Something went wrong",
            error: 500,
          });
        }
      }
    }
  };
};
