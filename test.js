// message , status code , error codes ,error

class HttpException extends Error {
  message;
  errorCode;
  statusCode;
  errors;

  constructor(message, errorCode, statusCode, errors) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

// const ErrorCode = {
//   USER_NOT_FOUND: 1001,
//   USER_ALREADY_EXISTED: 1002,
//   INCORRECT_PASSWORD: 1003,
// };

// console.log("this si working", ErrorCode.USER_ALREADY_EXISTED);

// class BadRequest extends HttpException {
//   constructor(message, errorCode) {
//     super(message, errorCode, 400, null);
//   }
// }

// const show = new BadRequest(
//   "user not found",
//   ErrorCode.USER_NOT_FOUND,
//   "errorcode",
//   "error",
// );

// console.log("this is status", show.statusCode);
// console.log("this is massage", show.message);
// console.log("this is errorcode", show.errorCode);
// console.log("this is error", show.errors);
