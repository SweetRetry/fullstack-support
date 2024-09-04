"use server";

import { prisma } from "../client";
import { IResponse } from "../utils/responseUtil";

export async function getArticleAnlytics() {
  const statusCounts = await prisma.article.groupBy({
    by: "status",
    _count: {
      status: true,
    },
  });

  return IResponse.Success(statusCounts);
}
