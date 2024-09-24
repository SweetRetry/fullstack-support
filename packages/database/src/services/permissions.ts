"use server";
import { StatusCodes } from "http-status-codes";
import { IResponse } from "../utils/responseUtil";
import { TokenUtil } from "../utils/tokenUtil";
import { prisma } from "../client";

export async function getAllPermissions(token: string) {
  try {
    const { userId } = TokenUtil.verifyToken(token);
    if (!userId) {
      return IResponse.PermissionDenied();
    }
    return IResponse.Success(await prisma.permission.findMany());
  } catch (err) {
    return IResponse.Error(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
}
