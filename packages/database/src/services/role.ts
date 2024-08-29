"use server";
import { prisma } from "../client";
import { IResponse } from "../utils/responseUtil";

export const getRoleList = async () => {
  try {
    const roles = await prisma.role.findMany();

    return IResponse.Success(roles);
  } catch (err) {
    return IResponse.Error(500, "Internal Server Error");
  }
};

export const getRolePermissionsById = async (roleId: string) => {
  try {
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
      include: {
        permissions: true,
      },
    });

    if (!role) {
      return IResponse.Error(404, "Role not found");
    }

    const allPermissions = await prisma.permission.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    const returnData = allPermissions.map((permission) => {
      const isChecked = role?.permissions?.some(
        (item) => item.id === permission.id
      );

      return {
        ...permission,
        isChecked,
      };
    });

    return IResponse.Success(returnData);
  } catch (err) {
    return IResponse.Error(500, "Internal Server Error");
  }
};

export async function putRolePermissionsUpdate(params: {
  roleId: string;
  permissions: string[];
}) {
  try {
    const role = await prisma.$transaction(async (tx) => {
      return await tx.role.update({
        where: {
          id: params.roleId,
        },
        data: {
          permissions: {
            set: params.permissions.map((permissionId) => ({
              id: permissionId,
            })),
          },
        },
      });
    });

    return IResponse.Success(role);
  } catch (err) {
    return IResponse.Error(500, "Internal Server Error");
  }
}
