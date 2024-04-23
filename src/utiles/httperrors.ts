export class HttpError extends Error {
  constructor(
    public message: string = "Something went wrong",
    public statusCode: number,
    public errors?: any,
  ) {
    super(message);
    this.statusCode = statusCode;
  }
  get jsonData() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors,
    };
  }

  static isHttpError(error: any): error is HttpError {
    return error instanceof HttpError;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string, errors?: any) {
    super(message, 400, errors);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, errors?: any) {
    super(message, 404, errors);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string, error?: any) {
    super(message, 500, error);
  }
}
