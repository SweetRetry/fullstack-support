"use client";
import ArticleViewer from "@/components/ArticleViewer";

import { Modal } from "@/components/ui-extends/Modal";

import { useList } from "@/hooks/useList";
import { formatToUtcTime } from "@repo/utils/dayjsUtil";
import { ArticleStatus } from "@prisma/client";
import { getArticleList } from "@repo/database/services/article";

import React, { useEffect, useState } from "react";
import { List } from "antd";

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
      <h3 className="text-xl font-bold">Recently Published</h3>

      <List
        loading={loading}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              setOpen(true);
              setActionItem(item);
            }}
          >
            <List.Item.Meta title={item.title} description={item.description} />

            <div className="text-muted-foreground">
              {formatToUtcTime(item.updatedAt)}
            </div>
          </List.Item>
        )}
      />

      {actionItem && (
        <Modal title={actionItem?.title} open={open} setOpen={setOpen}>
          <ArticleViewer id={actionItem.id} />
        </Modal>
      )}
    </section>
  );
};

export default RecentPublished;
