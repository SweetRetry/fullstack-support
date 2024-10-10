"use server";

import { StatusCodes } from "http-status-codes";
import { ArticleStatus, prisma } from "../client";
import { IResponse } from "../utils/responseUtil";
import dayjs from "dayjs";

export async function getArticleAnlytics(language: string) {
  try {
    let articles = await prisma.article.findMany({
      where: {
        language,
      },
    });
    let statusCounts: Record<string, number> = {};
    articles.forEach((item) => {
      if (
        item.status === ArticleStatus.PUBLISHED &&
        dayjs(item.publishedAt).isAfter(dayjs())
      ) {
        statusCounts["PENDING"] = statusCounts["PENDING"]
          ? statusCounts["PENDING"] + 1
          : 1;
      } else {
        statusCounts[item.status] = statusCounts[item.status]
          ? statusCounts[item.status] + 1
          : 1;
      }
    });

    return IResponse.Success(statusCounts);
  } catch (err) {
    return IResponse.Error(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
}
