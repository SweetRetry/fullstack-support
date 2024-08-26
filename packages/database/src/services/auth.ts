"use server";
import { Permission, prisma } from "../client";
import { PermissionUtil } from "../utils/authUtil";

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
    return IResponse.Success<Permission[] | undefined>(
      await PermissionUtil.getUserPermisson(token)
    );
  } catch (e) {
    return IResponse.PermissionDenied();
  }
}
