"use server";

import {prisma} from "@repo/database";

import { Article } from "@prisma/client";
import { z } from "zod";

export async function getExistArticle(articalId: string) {
  return await prisma.article.findUnique({
    where: {
      id: articalId,
    },
  });
}

export async function postSaveActical(data: {
  title: string;
  content: string;
  description: string;
}) {
  const schema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    description: z.string(),
  });

  const { success } = schema.safeParse(data);

  if (!success) {
    return {
      message: "params error",
      code: 500,
    };
  }

  const newArticle = await prisma.article.create({
    data,
  });

  return {
    message: "success",
    code: 200,
    data: newArticle,
  };
}

export async function putUpdateArticle(
  data: Partial<Article> & {
    id: string;
  },
) {
  const updatedArticle = await prisma.article.update({
    where: {
      id: data.id,
    },
    data,
  });

  return {
    message: "success",
    code: 200,
    data: updatedArticle,
  };
}
