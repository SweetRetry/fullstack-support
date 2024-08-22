import { ResponseData } from "../types";

export class IResponse {
  static Success<T = any>(data: T): ResponseData<T> {
    return {
      code: 200,
      data: data,
      message: "success",
    };
  }

  static Error(code: number, message: string): ResponseData<null> {
    return {
      code,
      data: null,
      message,
    };
  }
}
