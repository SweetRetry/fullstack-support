"use server";
import { prisma, Role } from "../client";
import { IResponse } from "../utils/responseUtil";

export type UserListItem = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
  role: Role | null;
};
export const getUserList = async (params: {
  pageId: number;
  pageSize: number;
  emailLike?: string;
}) => {
  try {
    const users = await prisma.user.findMany({
      take: params.pageSize,
      skip: (params.pageId - 1) * params.pageSize,
      select: {
        role: true,
        email: true,
        createdAt: true,
        id: true,
        updatedAt: true,
      },
      where: {
        email: {
          contains: params.emailLike,
        },
      },
    });

    const count = await prisma.user.count();

    return IResponse.Success({
      list: users,
      totalPage: Math.ceil(count / params.pageSize),
      totalCount: count,
    });
  } catch (err) {
    return IResponse.FakeSuccess(
      {
        list: [] as UserListItem[],
        totalPage: 0,
        totalCount: 0,
      },
      500,
      "Internal Server Error"
    );
  }
};

export const postCreateUser = async (params: {
  email: string;
  password: string;
  roleId: string;
}) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: params.email,
        password: params.password,
        role: {
          connect: {
            id: params.roleId,
          },
        },
      },
    });

    return IResponse.Success(newUser);
  } catch (err) {
    return IResponse.Error(500, "Internal Server Error");
  }
};
