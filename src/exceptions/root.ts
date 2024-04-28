// message , status code , error codes ,error

export class HttpException extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  errors: ErrorCode;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: any,
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }

  // static isHttpError(obj: any): obj is HttpException {
  //   return obj instanceof HttpException;
  // }

  static badRequest(message: string, errorCode: ErrorCode, errors: any) {
    return new HttpException(message, errorCode, 400, errors);
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  ADDRESS_NOT_FOUND = 1004,
  ADDRESS_DOES_NOT_BELONG = 1005,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001,
  UNAUTHORIZED = 4001,

  PRODUCT_NOT_FOUND = 5001,

  ORDER_NOT_FOUND = 6001,
}

//  This is second way to handle

// class HttpRes {
//   declare data: any;
//   declare message: string;
//   declare status: number;

//   constructor(data: any, message: string, status: number) {
//     this.data = data;
//     this.message = message;
//     this.status = status;
//   }

//   static isHttpRes(obj: any): obj is HttpRes {
//     return obj instanceof HttpRes;
//   }

//   static ok(data: any, message: string) {
//     return new HttpRes(data, message, 200);
//   }

//   static created(data: any, message: string) {
//     return new HttpRes(data, message, 201);
//   }
// }

// class HttpError extends Error {
//   declare status: number;

//   constructor(message: string, status: number) {
//     super(message);

//     this.status = status;
//   }

//   static isHttpError(obj: any): obj is HttpError {
//     return obj instanceof HttpError;
//   }

//   static badRequest(message: string) {
//     return new HttpError(message, 400);
//   }
// }

// const user = HttpRes.ok({ user: "" }, "User data retrieved successfully");
// const errorResponse = HttpError.badRequest("Invalid request");

// if (HttpRes.isHttpRes(user)) {
//   console.log("Success response:", user.status, user.message, user.data);
// } else if (HttpError.isHttpError(errorResponse)) {
//   console.error("Error response:", errorResponse.status, errorResponse.message);
// }
