"use client";
import { Separator } from "@/components/ui/separator";
import { useList } from "@/hooks/useList";
import { formatToUtcTime } from "@/lib/dayjsUtil";
import { ArticleStatus } from "@prisma/client";
import { getArticleList } from "@repo/database/services/article";

import React, { useEffect } from "react";

const RecentPublished = () => {
  const { data, fetch } = useList(
    { pageId: 1, pageSize: 4, status: ArticleStatus.PUBLISHED },
    getArticleList,
  );

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section className="w-1/2 rounded-lg bg-muted p-4 shadow-sm">
      <h3 className="mb-4 text-xl font-bold">Recently Published</h3>
      <ul className="space-y-2">
        {data.map((article, index) => (
          <li key={article.id}>
            <div className="flex items-center justify-between">
              <label>{article.title}</label>
              <span className="text-muted-foreground">
                {formatToUtcTime(article.updatedAt)}
              </span>
            </div>
            <p className="mt-2 text-muted-foreground">{article.description}</p>
            {index !== data.length - 1 && <Separator className="my-4" />}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecentPublished;
