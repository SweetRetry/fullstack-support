import { PrismaClient } from "@prisma/client";

// 定义 globalThis 的类型以包含 prisma 属性
declare module global {
  let prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;


export * from "@prisma/client";
