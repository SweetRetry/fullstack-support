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
