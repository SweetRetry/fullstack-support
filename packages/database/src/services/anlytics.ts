"use server";

import { StatusCodes } from "http-status-codes";
import { prisma } from "../client";
import { IResponse } from "../utils/responseUtil";

export async function getArticleAnlytics() {
  try {
    const statusCounts = await prisma.article.groupBy({
      by: "status",
      _count: true,
    });

    return IResponse.Success(statusCounts);
  } catch (err) {
    return IResponse.Error(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
}
