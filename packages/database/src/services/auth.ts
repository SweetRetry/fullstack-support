"use server";
import { prisma } from "../client";
import jwt from "jsonwebtoken";
import { IResponse } from "../utils/response";

export async function login(data: { email: string; password: string }) {
  if(!data.email || !data.password) return IResponse.Error(400, "参数错误");
  const user = await prisma.user.findUnique({
    where: { email: data.email, password: data.password },
  });
  if (user) {
    // 生成 JWT
    const token = jwt.sign(
      { userId: user.id },
      "sweetRetry-fullstack-support",
      {
        expiresIn: "1h", // 设置过期时间，这里设置为 1 小时
      }
    );
    return IResponse.Success<{
      token: string;
    }>({
      token,
    });
  } else {
    return IResponse.Error(401, "用户名或密码错误");
  }
}
