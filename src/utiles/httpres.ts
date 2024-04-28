export class HttpRes {
  declare data: any;
  declare message: string;
  declare status: number;
  constructor(data: any, message: string, status: number) {
    this.data = data;
    this.message = message;
    this.status = status;
  }

  static isHttpRes(obj: any): obj is HttpRes {
    return obj instanceof HttpRes;
  }

  static ok(data: any, message: string) {
    return new HttpRes(data, message, 200);
  }

  static created(data: any, message: string) {
    return new HttpRes(data, message, 201);
  }
}
