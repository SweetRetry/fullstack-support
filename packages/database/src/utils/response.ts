
export interface ResponseData<T = any> {
  data: T;
  code: number;
  message: string;
}

export class IResponse {
  static Success<T = any>(data: T, message?: string): ResponseData<T> {
    return {
      code: 200,
      data: data,
      message: message || "success",
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
