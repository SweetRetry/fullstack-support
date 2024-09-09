import cron from "node-cron";

import RedisClient from "../client";
import { prisma } from "@repo/database";
import { ArticleStatus } from "@prisma/client";
import { formatToUtcTime } from "@repo/utils/dayjsUtil";
import dayjs from "dayjs";

cron.schedule("* * * * *", async () => {
  const now = formatToUtcTime(new Date());

  const keys = await RedisClient.keys("pending:artcile:*");

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
        `pending:artcile:${article.id}`
      );
      console.log(publishedTime, dayjs(now).isAfter(dayjs(publishedTime)));
      // 如果当前时间已经超过publishedTime，则更新文章状态为已发布
      if (publishedTime && dayjs(now).isAfter(dayjs(publishedTime))) {
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

  // 遍历所有key，删除已发布的文章的缓存
  await Promise.all(
    shouldUpdatedList.map(async (key) => {
      await RedisClient.del(`pending:article:${key}`);
    })
  );
});
