"use server";
import { StatusCodes } from "http-status-codes";
import { Permission, prisma } from "../client";
import { IResponse } from "../utils/responseUtil";
import { TokenUtil } from "../utils/tokenUtil";

export async function login(data: { email: string; password: string }) {
  if (!data.email || !data.password) return IResponse.Error(400, "参数错误");
  const user = await prisma.user.findUnique({
    where: { email: data.email, password: data.password },
  });
  if (user) {
    // 生成 JWT
    const token = TokenUtil.generateToken(user.id, user.roleId);
    return IResponse.Success<{
      token: string;
    }>({
      token,
    });
  } else {
    return IResponse.Error(401, "用户名或密码错误");
  }
}

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
