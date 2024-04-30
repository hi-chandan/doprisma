// middleware handle errors
import { Response, Request, NextFunction } from "express";
import { HttpError, InternalServerError } from "../utiles/httperrors";
import { ZodError } from "zod";
import httpStatus from "http-status";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // http errors
  if (HttpError.isHttpError(err)) {
    return res.status(err.statusCode).json(err.jsonData);
  }
  if (err instanceof ZodError) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: err.formErrors.fieldErrors });
  }
  // unknown errors
  // unknown errors
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Internal server error";

  // prisma error
  switch (err.code) {
    case "P2000":
      statusCode = httpStatus.BAD_REQUEST;
      message =
        "The provided value for the column is too long for the column type";
      break;
    case "P2001":
      statusCode = httpStatus.NOT_FOUND;
      message = `The requested record in the where condition does not exist: ${err?.meta?.model}.${err?.meta?.field} = ${err?.meta?.value}`;
      break;
    case "P2002":
      statusCode = httpStatus.CONFLICT;
      message = `Uniqueness constraint failure in ${err?.meta?.target}`;
      break;
    case "P2003":
      statusCode = httpStatus.BAD_REQUEST;
      message = `Foreign key constraint failure in the column: ${
        err?.meta?.target ?? err?.meta?.field_name
      }`;
      break;
    case "P2004":
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `A database constraint failed: ${err?.message}`;
      break;
    case "P2005":
      statusCode = httpStatus.BAD_REQUEST;
      message = `The value ${err?.meta?.value} stored in the database for the field ${err?.meta?.field} is invalid for the field type`;
      break;
    case "P2006":
      statusCode = httpStatus.BAD_REQUEST;
      message = `The provided value ${err?.meta?.value} for the field ${err?.meta?.model}.${err?.meta?.field} is not valid`;
      break;
    case "P2007":
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `Data validation error: ${err?.message}`;
      break;
    case "P2008":
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `Transaction API error: ${err?.meta?.error}`;
      break;
    case "P2009":
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `Query validation error: ${err?.meta?.query_validation_error} at ${err?.meta?.query_position}`;
      break;
    case "P2010":
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `Raw query failure. Code: ${err?.meta?.code}. Message: ${err?.meta?.message}`;
      break;
    case "P2011":
      statusCode = httpStatus.BAD_REQUEST;
      message = `Nullity constraint violation in ${
        err?.meta?.target ?? err?.meta?.constraint
      }`;
      break;
    case "P2012":
      statusCode = httpStatus.BAD_REQUEST;
      message = `Missing mandatory value in ${err?.meta?.path}`;
      break;
    case "P2013":
      statusCode = httpStatus.BAD_REQUEST;
      message = `Missing mandatory argument ${err?.meta?.argument_name} for the field ${err?.meta?.field_name} in ${err?.meta?.object_name}`;
      break;
    case "P2014":
      statusCode = httpStatus.CONFLICT;
      message = `The change you're trying to make would violate the required relationship '${err?.meta?.relation_name}' between models ${err?.meta?.model_a_name} and ${err?.meta?.model_b_name}`;
      break;
    case "P2015":
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `Related record not found: ${err?.meta?.details}`;
      break;
    case "P2016":
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `Query interpretation error: ${err?.meta?.details}`;
      break;
    case "P2017":
      statusCode = httpStatus.BAD_REQUEST;
      message = `Records in the relationship ${err?.meta?.relation_name} between models ${err?.meta?.parent_name} and ${err?.meta?.child_name} are not connected`;
      break;
    case "P2018":
      statusCode = httpStatus.BAD_REQUEST;
      message = `Required connected records were not found: ${err?.meta?.details}`;
      break;
    case "P2019":
      statusCode = httpStatus.BAD_REQUEST;
      message = `Input error: ${err?.meta?.details}`;
      break;
    case "P2020":
      statusCode = httpStatus.BAD_REQUEST;
      message = `Value out of range for the type: ${err?.meta?.details}`;
      break;
    case "P2021":
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `The table ${err?.meta?.table} does not exist in the current database`;
      break;
    case "P2022":
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `The column ${err?.meta?.column} does not exist in the current database`;
      break;
    case "P2023":
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `Inconsistent column data: ${err?.message}`;
      break;
    case "P2024":
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `Timeout while acquiring a new connection in the connection pool. (More information: http://pris.ly/d/connection-pool) (Current connection pool timeout: ${err?.meta?.timeout}, connection limit: ${err?.meta?.connection_limit})`;
      break;
    case "P2025":
      statusCode = httpStatus.BAD_REQUEST;
      message = `An operation failed because it depends on one or more required records that were not found: ${err?.meta?.cause}`;
      break;
    case "P2026":
      statusCode = httpStatus.BAD_REQUEST;
      message = `The current database provider does not support a feature used in the query: ${err?.meta?.feature}`;
      break;
    case "P2027":
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `Multiple database errors occurred during query execution: ${err?.meta?.errors}`;
      break;
    case "P2028":
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `Transaction API error: ${err?.meta?.error}`;
      break;
    case "P2030":
      statusCode = httpStatus.BAD_REQUEST;
      message = `A full-text index for search could not be found. Try adding @@fulltext([Fields...]) to your schema`;
      break;
    case "P2031":
      statusCode = httpStatus.BAD_REQUEST;
      message = `Prisma needs to perform transactions, which requires your MongoDB server to run as a replica set. See details: http://pris.ly/d/mongodb-replica-set`;
      break;
    case "P2033":
      statusCode = httpStatus.BAD_REQUEST;
      message = `A number used in the query does not fit in a 64-bit signed integer. Consider using BigInt as a field type if you're trying to store large integers`;
      break;
    case "P2034":
      statusCode = httpStatus.CONFLICT;
      message = `The transaction failed due to a write conflict or deadlock. Please try your transaction again`;
      break;
  }

  // console on error
  console.error(err);

  return res.status(statusCode).json({
    statusCode,
    message,
    data: err.meta.message,
  });
};
