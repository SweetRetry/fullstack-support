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
import { formatToUtcTime } from "@/lib/dayjsUtil";

import Link from "next/link";
// import dynamic from "next/dynamic";
import React from "react";
import CategoryMenu from "../_components/CategoryMenu";
import { getCategoryWithArticles } from "@repo/database/services/category";

// const LocalTime = dynamic(() => import("@/components/LocalTime"), {
//   ssr: false,
// });
const page = async ({
  params,
}: {
  params: {
    categoryId: string;
  };
}) => {
  const { data: category } = await getCategoryWithArticles(params.categoryId);

  return (
    <main className="flex">
      <CategoryMenu categoryId={params.categoryId} />
      <section className="flex-1">
        <SectionWrap className="mobile:px-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/support">Support Center</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/support/faq">FAQ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="space-y-4">
            {category?.articles.map((article, index) => (
              <div key={article.id}>
                <div className="mb-4 flex items-center justify-between">
                  <Link
                    href={`/faq/article/${article.id}`}
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
                {index !== category.articles.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </SectionWrap>
      </section>
    </main>
  );
};

export default page;
