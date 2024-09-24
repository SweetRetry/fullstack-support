import { StatusCodes } from "http-status-codes";
import { ResponseData } from "../types/response";

export class IResponse {
  static Success<T = any>(data: T, message?: string): ResponseData<T> {
    return {
      code: StatusCodes.OK,
      data: data,
      message: message || "success",
    };
  }
  static FakeSuccess<T = any>(
    data: T,
    code: number,
    message?: string
  ): ResponseData<T> {
    return {
      code,
      data,
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

  static PermissionDenied(): ResponseData<null> {
    return IResponse.Error(StatusCodes.FORBIDDEN, "Permission Denied");
  }
}
