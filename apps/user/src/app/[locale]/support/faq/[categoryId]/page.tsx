import SectionWrap from "@/components/SectionWrap";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
// import dynamic from "next/dynamic";
import React from "react";
import CategoryMenu from "../_components/CategoryMenu";
import { getCategoryWithArticles } from "@repo/database/services/category";
import { formatToUtcTime } from "@repo/utils/dayjsUtil";
import { getTranslations } from "next-intl/server";
import Empty from "@/components/Empty";

const page = async ({
  params,
}: {
  params: {
    categoryId: string;
    locale: string;
  };
}) => {
  const t = await getTranslations({ locale: params.locale });
  const { data: category } = await getCategoryWithArticles({
    categoryId: params.categoryId,
    language: params.locale,
  });

  return (
    <main className="flex">
      <CategoryMenu categoryId={params.categoryId} locale={params.locale} />
      <section className="flex-1">
        <SectionWrap className="mobile:px-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/support">
                  {t("support-center")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/support/faq">{t("faq")}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="space-y-4">
            {category?.articles?.length ? (
              category?.articles.map((article, index) => (
                <div key={article.id}>
                  <div className="mb-4 flex items-center justify-between">
                    <Link
                      href={`/support/faq/${params.categoryId}/article/${article.id}`}
                      className="text-xl font-bold"
                    >
                      {article.title}
                    </Link>

                    <span className="text-muted-foreground">
                      {/* {article.publishedAt && <LocalTime time={article.publishedAt} />} */}
                      {article.updatedAt && formatToUtcTime(article.updatedAt)}
                    </span>
                  </div>
                  <p className="whitespace-pre-line text-muted-foreground">
                    {article.description}
                  </p>
                  {index !== (category.articles?.length || 1) - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))
            ) : (
              <Empty />
            )}
          </div>
        </SectionWrap>
      </section>
    </main>
  );
};

export default page;
