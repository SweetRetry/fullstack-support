"use client";
import React, { useEffect, useState } from "react";

import { useList } from "@/hooks/useList";
import { getArticleList } from "@repo/database/services/article";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

import { ArticleStatus } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { formatToUtcTime } from "@repo/utils/dayjsUtil";
import { cn } from "@/lib/utils";
import ArticleViewer from "@/components/ArticleViewer";

import ViewerToolBar from "./_components/ViewerToolBar";

const page = () => {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<ArticleStatus | undefined>();
  const [categroId, setCategoryId] = useState<string | undefined>();

  const { fetch, data, setData, loading } = useList(
    { keyword, status, categroId },
    getArticleList,
  );

  const [actionArticleItem, setActionArticleItem] =
    useState<(typeof data)["0"]>();

  useEffect(() => {
    setActionArticleItem(data?.at(0));
  }, [data]);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section className="flex h-full space-x-4 border-t border-border">
      <section className="w-1/3 min-w-[500px]">
        <div className="flex h-12 items-center justify-between space-x-4">
          <Input
            className="max-w-[250px]"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              fetch();
            }}
            placeholder="Search article by keywords"
          />

          {/* TODO:目录筛选 */}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FilterIcon width={20} height={20} className="mr-1" />
                <span> Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-10 bg-background shadow">
              <DropdownMenuItem
                onClick={() => {
                  setStatus(undefined);
                  fetch();
                }}
              >
                All
              </DropdownMenuItem>
              {Object.values(ArticleStatus).map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setStatus(item);
                    fetch();
                  }}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ul
          className="mt-2 space-y-3 overflow-auto"
          style={{
            maxHeight: "calc(100vh - 200px)",
          }}
        >
          {loading ? (
            <LoadingSpinner className="" />
          ) : (
            data.map((item) => (
              <li
                key={item.id}
                className={cn(
                  "cursor-pointer rounded border border-solid border-border p-4 hover:bg-muted active:bg-muted",
                  {
                    "bg-muted": actionArticleItem?.id === item.id,
                  },
                )}
                onClick={() => setActionArticleItem(item)}
              >
                <div className="flex justify-between">
                  <h4 className="font-bold">{item.title}</h4>
                  <p>{formatToUtcTime(item.updatedAt)}</p>
                </div>

                <p className="my-4 text-muted-foreground">{item.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span
                    className={cn(
                      "mt-2 rounded border border-border bg-foreground px-2 py-1 text-background",
                      {
                        invisible: !item.category?.id,
                      },
                    )}
                  >
                    {item.category?.name}
                  </span>

                  <span>{item.status}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="flex-1 border-l border-border px-4">
        {actionArticleItem && (
          <>
            <ViewerToolBar
              id={actionArticleItem?.id}
              status={actionArticleItem?.status}
              setData={setData}
            />
          </>
        )}
        <div className="py-2">
          <ArticleViewer id={actionArticleItem?.id} />
        </div>
      </section>
    </section>
  );
};

export default page;
