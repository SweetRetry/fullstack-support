"use client";
import ArticleViewer from "@/components/ArticleViewer";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Modal } from "@/components/ui-extends/Modal";

import { useList } from "@/hooks/useList";
import { formatToUtcTime } from "@repo/utils/dayjsUtil";
import { ArticleStatus } from "@prisma/client";
import { getArticleList } from "@repo/database/services/article";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import React, { useEffect, useState } from "react";

const RecentPublished = () => {
  const [open, setOpen] = useState(false);

  const { data, fetch, loading } = useList(
    { pageId: 1, pageSize: 4, status: ArticleStatus.PUBLISHED },
    getArticleList,
  );

  const [actionItem, setActionItem] = useState<(typeof data)["0"]>();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section className="w-1/2 rounded-lg border border-solid border-border p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Recently Published</h3>
        <Link
          href="/articles"
          className="flex items-center space-x-1 text-muted-foreground hover:text-primary"
        >
          <span>More</span>
          <ArrowRight width={16} height={16} />
        </Link>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="space-y-3 *:border-b *:border-solid *:border-border">
          {data.map((article) => (
            <li
              key={article.id}
              className="hover:bg- cursor-pointer last:border-none"
              onClick={() => {
                setOpen(true);
                setActionItem(article);
              }}
            >
              <div className="flex items-center justify-between">
                <label>{article.title}</label>
                <span className="text-muted-foreground">
                  {formatToUtcTime(article.updatedAt)}
                </span>
              </div>
              <p className="mt-2 text-muted-foreground">
                {article.description}
              </p>
            </li>
          ))}
        </ul>
      )}

      {actionItem && (
        <Modal title={actionItem?.title} open={open} setOpen={setOpen}>
          <ArticleViewer id={actionItem.id} />
        </Modal>
      )}
    </section>
  );
};

export default RecentPublished;
