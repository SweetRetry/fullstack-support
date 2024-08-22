import {prisma} from "@repo/database";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const getPosts = async (categoryId: string) => {
  const data = await prisma.article.findMany({
    where: {
      categoryId,
      published: true,
    },
    select: {
      id: true,
      title: true,
    },
  });
  return data;
};

const RealtedArticles = async ({
  categoryId,
  currentArticleId,
}: {
  categoryId: string;
  currentArticleId: string;
}) => {
  if (!categoryId) return null;
  const relatedPosts = await getPosts(categoryId);
  return (
    <aside className="w-[280px] min-w-[280px] mobile:hidden ml-4">
      <h3 className="mb-4 text-2xl font-bold">Related Articles</h3>
      <nav className="space-y-4">
        {relatedPosts.map((item) => (
          <Link
            key={item.id}
            href={`/faq/article/${item.id}`}
            className={cn(
              "block rounded p-2 text-sm hover:bg-muted hover:text-muted-foreground",
              {
                "bg-muted text-muted-foreground": item.id === currentArticleId,
              },
            )}
          >
            {decodeURI(item.title)}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default RealtedArticles;
