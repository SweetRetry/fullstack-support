"use server";
import { StatusCodes } from "http-status-codes";
import { Permission, prisma } from "../client";
import { IResponse } from "../utils/responseUtil";
import { TokenUtil } from "../utils/tokenUtil";

export async function getPermissionList(token: string) {
  try {
    const roleId = TokenUtil.verifyToken(token)?.roleId;
    if (!roleId) return IResponse.PermissionDenied();
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
      select: {
        permissions: true,
      },
    });

    return IResponse.Success<Permission[] | undefined>(role?.permissions);
  } catch (e) {
    return IResponse.Error(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
}
