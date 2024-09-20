"use client";
import React, { useEffect, useState } from "react";

import { useList } from "@/hooks/useList";
import { getArticleList } from "@repo/database/services/article";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

import { ArticleStatus } from "@prisma/client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { formatToUtcTime } from "@repo/utils/dayjsUtil";
import { cn } from "@/lib/utils";
import ArticleViewer from "@/components/ArticleViewer";

import ViewerToolBar from "./_components/ViewerToolBar";

import { Empty } from "antd";
import Link from "next/link";
import FilterModalContent from "./_components/FilterModalContent";
import dayjs from "dayjs";

const page = () => {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<ArticleStatus>();
  const [categoryId, setCategoryId] = useState<string>();

  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const { fetch, data, setData, loading, debounceFetch } = useList(
    { keyword, status, categoryId },
    getArticleList,
  );

  const [actionItemId, setActionItemId] = useState<string>();

  const actionArticleItem = data.find((item) => item.id === actionItemId);

  async function wrapFetch() {
    const res = await fetch();

    if (res?.list.length) {
      setActionItemId(res.list[0].id);
    }
  }

  useEffect(() => {
    document.title = "Articles";
  }, []);

  useEffect(() => {
    wrapFetch();
  }, [status, categoryId]);

  return (
    <section className="flex h-full space-x-4 border-t border-border">
      <section className="w-1/3 min-w-[400px]">
        <div className="flex h-12 items-center justify-between space-x-4">
          <Input
            className="max-w-[250px]"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              debounceFetch();
            }}
            placeholder="Search article by keywords"
          />

          <Button variant="outline" onClick={() => setFilterModalOpen(true)}>
            <FilterIcon width={20} height={20} className="mr-1" />
            <span>Filter</span>
          </Button>
        </div>

        <ul
          className="mt-2 space-y-3 overflow-auto"
          style={{
            maxHeight: "calc(100vh - 200px)",
          }}
        >
          {loading ? (
            <LoadingSpinner />
          ) : data.length ? (
            data.map((item) => (
              <li
                key={item.id}
                className={cn(
                  "cursor-pointer rounded border border-solid border-border p-4 hover:bg-muted active:bg-muted",
                  {
                    "bg-muted": actionArticleItem?.id === item.id,
                  },
                )}
                onClick={() => setActionItemId(item.id)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm">{formatToUtcTime(item.updatedAt)}</p>
                </div>

                <p className="my-4 text-muted-foreground">{item.description}</p>
                <div className="flex items-center space-x-2 text-sm">
                  {item.category?.id && (
                    <span className="mt-2 rounded-full border border-border px-2 py-1">
                      {item.category?.name}
                    </span>
                  )}

                  <span
                    className={cn(
                      "mt-2 rounded-full border border-border px-2 py-1",
                    )}
                  >
                    {item.status}
                    {item.status === ArticleStatus.PENDING && (
                      <span>
                        {" - "}{" "}
                        {dayjs(item.publishedAt).format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                    )}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <Empty description="No articles">
              <Link href="/articles/editor/draft/new">
                <Button>Create Now</Button>
              </Link>
            </Empty>
          )}
        </ul>
      </section>

      <section className="flex-1 border-l border-border pl-4">
        {actionArticleItem && (
          <>
            <ViewerToolBar
              id={actionArticleItem?.id}
              status={actionArticleItem?.status}
              setData={setData}
            />
            <div className="py-2">
              <ArticleViewer id={actionArticleItem?.id} />
            </div>
          </>
        )}
      </section>

      <FilterModalContent
        open={filterModalOpen}
        setOpen={setFilterModalOpen}
        onConfirm={(
          status: ArticleStatus | undefined,
          categoryId: string | undefined,
        ) => {
          setStatus(status);
          setCategoryId(categoryId);
          setFilterModalOpen(false);
        }}
      />
    </section>
  );
};

export default page;
