import { ArticleStatus, prisma } from "@repo/database";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { getTranslations } from "next-intl/server";
import Empty from "@/components/Empty";

const getArticles = async (categoryId: string, language: string) => {
  const data = await prisma.article.findMany({
    where: {
      categoryId,
      status: ArticleStatus.PUBLISHED,
      language,
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
  locale,
}: {
  categoryId: string;
  currentArticleId: string;
  locale: string;
}) => {
  if (!categoryId) return null;
  const t = await getTranslations({ locale });
  const relatedArticles = await getArticles(categoryId, locale);
  return (
    <aside className="ml-4 w-[280px] min-w-[280px] mobile:hidden">
      <h3 className="mb-4 text-2xl font-bold">{t("related-articles")}</h3>
      <nav className="space-y-2">
        {relatedArticles.length ? (
          relatedArticles.map((item) => (
            <Link
              key={item.id}
              href={`/support/faq/${categoryId}/article/${item.id}`}
              className={cn(
                "block rounded p-2 text-sm hover:bg-muted hover:text-muted-foreground",
                {
                  "bg-muted text-muted-foreground":
                    item.id === currentArticleId,
                },
              )}
            >
              {decodeURI(item.title)}
            </Link>
          ))
        ) : (
          <Empty />
        )}
      </nav>
    </aside>
  );
};

export default RealtedArticles;
