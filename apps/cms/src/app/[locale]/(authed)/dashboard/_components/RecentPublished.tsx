"use client";
import ArticleViewer from "@/components/ArticleViewer";

import { Modal } from "@/components/ui-extends/Modal";

import { useList } from "@/hooks/useList";
import { formatToUtcTime } from "@repo/utils/dayjsUtil";
import { ArticleStatus } from "@prisma/client";
import { getArticleList } from "@repo/database/services/article";

import React, { useEffect, useState } from "react";
import { List } from "antd";
import { useTranslations } from "next-intl";

const RecentPublished = ({ locale }: { locale: string }) => {
  const t = useTranslations();

  const [open, setOpen] = useState(false);

  const { data, fetch, loading } = useList(
    {
      pageId: 1,
      pageSize: 4,
      status: ArticleStatus.PUBLISHED,
      language: "en-US",
    },
    getArticleList,
  );

  const [actionItem, setActionItem] = useState<(typeof data)["0"]>();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section className="flex-1 rounded-lg">
      <List
        loading={loading}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            className="cursor-pointer hover:bg-muted"
            onClick={() => {
              setOpen(true);
              setActionItem(item);
            }}
          >
            <List.Item.Meta
              title={<span className="text-foreground">{item.title}</span>}
              description={
                <span className="text-foreground">{item.description}</span>
              }
            />

            <div className="text-muted-foreground">
              {formatToUtcTime(item.updatedAt)}
            </div>
          </List.Item>
        )}
      />

      {actionItem && (
        <Modal title={actionItem?.title} open={open} setOpen={setOpen}>
          <ArticleViewer id={actionItem.id} locale={locale} />
        </Modal>
      )}
    </section>
  );
};

export default RecentPublished;
