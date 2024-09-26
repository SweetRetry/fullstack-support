"use client";
import ArticleViewer from "@/components/ArticleViewer";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Modal } from "@/components/ui-extends/Modal";

import { formatToUtcTime } from "@repo/utils/dayjsUtil";

import { getPendingArticles } from "@repo/database/services/article";

import React, { useEffect, useState } from "react";
import { Article } from "@prisma/client";
import { List } from "antd";
import { useTranslations } from "next-intl";

const TimerPublished = ({ locale }: { locale: string }) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [pendingArticles, setPendingArticles] = useState<Article[]>([]);

  const [actionItemId, setActionItemId] = useState("");

  const actionArticle = pendingArticles.find(
    (item) => item.id === actionItemId,
  );

  useEffect(() => {
    async function run() {
      setLoading(true);
      const res = await getPendingArticles(5);
      if (res?.data) {
        setPendingArticles(res.data);
      }
      setLoading(false);
    }

    run();
  }, []);

  return (
    <section className="w-1/2 rounded-lg border border-solid border-border p-4">
      <h3 className="text-xl font-bold">{t("timer-published")}</h3>

      <List
        loading={loading}
        dataSource={pendingArticles}
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              setOpen(true);
              setActionItemId(item.id);
            }}
          >
            <List.Item.Meta title={item.title} description={item.description} />

            <div className="text-muted-foreground">
              {formatToUtcTime(item.updatedAt)}
            </div>
          </List.Item>
        )}
      />

      {actionArticle && (
        <Modal title={actionArticle?.title} open={open} setOpen={setOpen}>
          <ArticleViewer id={actionArticle.id} locale={locale} />
        </Modal>
      )}
    </section>
  );
};

export default TimerPublished;
