"use client";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";

import { useList } from "@/hooks/useList";
import { deleteArticle, getArticleList } from "@repo/database/services/article";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterIcon, Plus, PlusIcon } from "lucide-react";
import { DataTable } from "./data-table";
import { useColumns } from "./columns";
import { ArticleStatus } from "@prisma/client";
import { Modal, useModal } from "@/components/ui-extends/Modal";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import ArticleViewer from "@/components/ArticleViewer";
import Link from "next/link";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { formatToUtcTime } from "@/lib/dayjsUtil";
import { cn } from "@/lib/utils";

const page = () => {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<ArticleStatus | undefined>();
  const [categroId, setCategoryId] = useState<string | undefined>();

  const { fetch, data, setData, totalCount, totalPage, loading } = useList(
    { keyword, status, categroId },
    getArticleList,
  );

  const [actionArticleItem, setActionArticleItem] =
    useState<(typeof data)["0"]>();

  const { toast } = useToast();

  const { show, contextHandler, close } = useModal({
    danger: true,
    title: "Confirm Delete",
    description:
      "After deleting, you will not be able to recover this article.",
    content: "Are you sure you want to delete this article?",
    onConfirm: async () => {
      const token = localStorage.getItem("token");
      if (actionArticleItem?.id && token) {
        const id = await deleteArticle({ id: actionArticleItem?.id }, token);
        if (id) {
          close();
          setData((prev) =>
            prev.map((item) => ({
              ...item,
              status:
                item.id === actionArticleItem.id
                  ? ArticleStatus.DELETED
                  : item.status,
            })),
          );
        } else {
          toast({
            title: "Delete Failed",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      }
    },
  });

  const columns = useColumns({
    onOpenDeleteModal: (item) => {
      setActionArticleItem(item);
      show();
    },
    onOpenPreviewModal: (item) => {
      setActionArticleItem(item);
    },
  });

  useEffect(() => {
    setActionArticleItem(data?.at(0));
  }, [data]);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <main className="flex space-x-4">
      {contextHandler}

      <section className="w-1/3 min-w-[380px]">
        <div className="flex justify-between">
          <Input
            className="max-w-[250px]"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              fetch();
            }}
            placeholder="Search article by keywords"
          />
          <div className="flex gap-2">
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
            <Link href="/articles/editor/draft/new">
              <Button>
                <PlusIcon width={20} height={20} className="mr-1" />
                <span>Create</span>
              </Button>
            </Link>
          </div>
        </div>
        <ul
          className="space-y-3 overflow-auto py-4"
          style={{
            maxHeight: "calc(100vh - 200px)",
          }}
        >
          {loading ? (
            <LoadingSpinner />
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
        {/* <DataTable
          columns={columns}
          data={data}
          loading={loading}
          totalCount={totalCount}
          totalPage={totalPage}
        /> */}
      </section>

      <section className="flex-1">
        <ArticleViewer id={actionArticleItem?.id} />
      </section>
    </main>
  );
};

export default page;
