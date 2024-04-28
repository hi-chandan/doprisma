// middleware handle errors
import { Response, Request, NextFunction } from "express";
import { HttpError, InternalServerError } from "../utiles/httperrors";
import { ZodError } from "zod";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // http errors
  if (HttpError.isHttpError(err)) {
    return res.status(err.statusCode).json(err.jsonData);
  }
  // console on error
  else if (err instanceof ZodError) {
    return res.status(404).json({
      message: "validation  error",
      errors: err.formErrors,
      statuscode: 404,
    });
  }

  console.error(err);

  // unknown errors
  return res
    .status(500)
    .send(new InternalServerError("This is Not Working").jsonData);
};
