"use server";

import { StatusCodes } from "http-status-codes";
import { ArticleStatus, prisma } from "../client";
import { IResponse } from "../utils/responseUtil";

export async function getCategoryListByPublished() {
  try {
    const categoryList = await prisma.category.findMany({
      where: {
        articles: {
          some: {
            status: ArticleStatus.PUBLISHED,
          },
        },
      },
    });

    return IResponse.Success(categoryList);
  } catch (err) {
    return IResponse.Error(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
}
