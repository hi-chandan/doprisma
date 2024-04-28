import { ErrorCode, HttpException } from "./root";

export class BadRequest extends HttpException {
  constructor(message: string, errorCode: ErrorCode, errors?: any) {
    super(message, errorCode, 400, errors);
  }
}

export class handleEntity extends HttpException {
  constructor(error: any, message: string, errorcode: number) {
    super(message, errorcode, 422, error);
  }
}

export class InternalException extends HttpException {
  constructor(message: string, errors: any, errorCode: number) {
    super(message, errorCode, 500, errors);
  }
}
