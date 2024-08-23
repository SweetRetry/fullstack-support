"use server";
import { ArticleStatus, prisma } from "../client";

import { IResponse } from "../utils/response";

// 统计articles数量
export async function getArticleStatics() {
  try {
    const count = await prisma.article.count({
      where: {
        status: ArticleStatus.DRAFT,
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

export async function getArticleList(params: {
  pageId: number;
  pageSize: number;
  status?: ArticleStatus;
  keyword?: string;
  categoryId?: string;
}) {
  const listFn = prisma.article.findMany({
    take: params.pageSize,
    skip: (params.pageId - 1) * params.pageSize,
    where: {
      OR: params.keyword
        ? [
            {
              title: {
                contains: params.keyword,
              },
            },
            {
              description: {
                contains: params.keyword,
              },
            },
          ]
        : undefined,
      status: params.status,
      categoryId: params.categoryId,
    },
    select: {
      id: true,
      title: true,
      status: true,
      updatedAt: true,
      category: params.categoryId
        ? {
            select: {
              id: true,
              name: true,
            },
          }
        : undefined,
    },
  });

  const totalCountFn = prisma.article.count({
    where: {
      OR: [
        {
          title: {
            contains: params.keyword,
          },
        },
        {
          content: {
            contains: params.keyword,
          },
        },
      ],
      status: params.status,
      categoryId: params.categoryId,
    },
  });

  const [list, totalCount] = await Promise.all([listFn, totalCountFn]);

  return IResponse.Success<{
    list: Array<{
      id: string;
      title: string;
      status: ArticleStatus;
      updatedAt: Date;
      category: { id: string; name: string } | null;
    }>;
    totalPage: number;
    totalCount: number;
  }>({
    list,
    totalPage: Math.ceil(totalCount / params.pageSize),
    totalCount,
  });
}

export async function deleteArticle(data: { id: string }) {
  try {
    const deletedArticle = await prisma.article.update({
      where: {
        id: data.id,
      },
      data: {
        status: ArticleStatus.DELETED,
      },
    });

    return IResponse.Success<string>(deletedArticle.id, "删除成功");
  } catch (err) {
    return IResponse.Error(500, "服务器错误");
  }
}
