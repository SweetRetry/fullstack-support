import { prisma } from "../client";

import { TokenUtil } from "./tokenUtil";

export class PermissionUtil {
  //   static async getUserRoleId(token: string) {
  //     return TokenUtil.verifyToken(token)?.roleId;
  //   }

  static async checkPermission(token: string, permission: string) {
    const roleId = TokenUtil.verifyToken(token)?.roleId;
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
      select: {
        permissions: true,
      },
    });

    if (!role) {
      return false;
    }

    return role?.permissions.some((item) => item.name === permission);
  }

  static async getUserPermisson(token: string) {
    const roleId = TokenUtil.verifyToken(token)?.roleId;

    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
      select: {
        permissions: true,
      },
    });
    return role?.permissions;
  }
}
