import cron from "node-cron";

import RedisClient from "../redis";
import { prisma } from "@repo/database";
import { ArticleStatus } from "@prisma/client";

cron.schedule("* * * * *", async () => {
  const now = new Date();
  console.log("🚀 ~ cron.schedule ~ now:", now);

  const keys = await RedisClient.keys("pending:artcile:*");
  console.log("🚀 ~ cron.schedule ~ keys:", keys);

  if (!keys.length) return;
  const pendingArticles = await prisma.article.findMany({
    where: {
      id: {
        in: keys.map((key) => key.split(":")[2]),
      },
    },
  });

  const shouldUpdatedList = [];
  for (const article of pendingArticles) {
    if (article.status === ArticleStatus.PENDING) {
      const publishedTime = await RedisClient.get(
        `pending:artcile:${article.id}`,
      );
      // 如果当前时间已经超过publishedTime，则更新文章状态为已发布
      if (publishedTime && now > new Date(publishedTime)) {
        shouldUpdatedList.push(article.id);
      }
    }
  }

  await prisma.article.updateMany({
    where: {
      id: {
        in: shouldUpdatedList,
      },
    },
    data: {
      status: ArticleStatus.PUBLISHED,
    },
  });

  RedisClient.del(keys);
});
