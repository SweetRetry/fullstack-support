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

export async function getCategoryWithArticles(categoryId: string) {
  try {
    const categroy = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        articles: {
          where: {
            status: ArticleStatus.PUBLISHED,
          },
          select: {
            id: true,
            title: true,
            updatedAt: true,
            description: true,
          },
        },
      },
    });

    return IResponse.Success(categroy);
  } catch (err) {
    return IResponse.Error(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
}

export async function getCategoryList(categoryName?: string) {
  try {
    const list = await prisma.category.findMany({
      where: {
        name: {
          contains: categoryName,
        },
      },
    });

    return IResponse.Success(list);
  } catch (err) {
    return IResponse.Error(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
}
export async function postCreateNewCategory(newCategoryName: string) {
  return await prisma.category.create({
    data: { name: newCategoryName },
  });
}
