"use server";

import { StatusCodes } from "http-status-codes";
import { ArticleStatus, prisma } from "../client";
import { IResponse } from "../utils/responseUtil";

export async function getCategoryListByPublished(language: string) {
  try {
    const categorys = await prisma.category.findMany({
      where: {
        language,
      },
    });

    return IResponse.Success(categorys);
  } catch (err) {
    return IResponse.Error(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
}

export async function getCategoryWithArticles({
  categoryId,
  language,
}: {
  categoryId: string;
  language: string;
}) {
  try {
    const categroy = await prisma.category.findUnique({
      where: {
        id_language: {
          id: categoryId,
          language,
        },
      },
      include: {
        articles: {
          where: {
            status: ArticleStatus.PUBLISHED,
            language,
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

export async function postCreateNewCategory(
  newCategoryName: string,
  language: string
) {
  return await prisma.$transaction(async (_prisma) => {
    const newCategory = await _prisma.category.create({
      data: {
        name: newCategoryName,
        language,
      },
    });

    return newCategory;
  });
}

export async function getCategoryList(language: string) {
  try {
    const list = await prisma.category.findMany({
      where: {
        language,
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
