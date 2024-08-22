"use server";
import { prisma } from "../client";
import { IResponse } from "../utils/response";

// 统计articles数量
export async function getArticleStatics() {
  try {
    const count = await prisma.article.count({
      where: {
        published: true,
      },
    });

    return IResponse.Success<{
      count: number;
    }>({
      count,
    });
  } catch (err) {
    return IResponse.Error(500, "服务器错误");
  }
}
