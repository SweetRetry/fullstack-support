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
