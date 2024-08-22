"use server";

import {prisma} from "@repo/database";


export async function getCategoryList(categoryName?: string) {
  return await prisma.category.findMany({
    where: {
      name: {
        contains: categoryName,
      },
    },
  });
}
export async function create(newCategoryName: string) {
  return await prisma.category.create({
    data: { name: newCategoryName },
  });
}
