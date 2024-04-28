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
<<<<<<< HEAD
  if (HttpError.isHttpError(err)) {
    return res.status(err.statusCode).json(err.jsonData);
  }
=======
  if (HttpError.isHttpError(err))
    return res.status(err.statusCode).json(err.jsonData);
>>>>>>> 01e9a1c70a3e400f3647ee66bef6c1a137f5d7b8
  // console on error
  else if (err instanceof ZodError) {
    return res.status(404).json({
      message: "validation  error",
      errors: err.formErrors,
      statuscode: 404,
    });
  }
<<<<<<< HEAD

  console.error(err);

  // unknown errors
  return res
    .status(500)
    .send(new InternalServerError("This is Not Working").jsonData);
=======
  console.error(err);

  // unknown errors
  return res.status(500).send(new InternalServerError(err.message).jsonData);
>>>>>>> 01e9a1c70a3e400f3647ee66bef6c1a137f5d7b8
};
