"use server";
import { prisma } from "../client";
import { IResponse } from "../utils/responseUtil";

export const getRoles = async (params: {
  pageId: number;
  pageSize: number;
}) => {
  try {
    const roles = await prisma.role.findMany({
      take: params.pageSize,
      skip: (params.pageId - 1) * params.pageSize,
    });

    const count = await prisma.role.count();

    return IResponse.Success({
      list: roles,
      pageId: params.pageId,
      pageSize: params.pageSize,
      totalPage: Math.ceil(count / params.pageSize),
      totalCount: count,
    });
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
