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
import { formatToUtcTime } from "@/lib/dayjsExtend";

import Link from "next/link";
// import dynamic from "next/dynamic";
import React from "react";
import CategoryMenu from "../_components/CategoryMenu";
import { prisma } from "@repo/database";

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
  const categroy = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
    include: {
      articles: {
        where: {
          published: true,
        },
        select: {
          id: true,
          title: true,
          publishedAt: true,
          description: true,
        },
      },
    },
  });

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
                <BreadcrumbPage>{categroy?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="space-y-4">
            {categroy?.articles.map((article, index) => (
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
                    {article.publishedAt &&
                      formatToUtcTime(article.publishedAt)}
                  </span>
                </div>
                <p className="whitespace-pre-line text-muted-foreground">
                  {article.description}
                </p>
                {index !== categroy.articles.length - 1 && (
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
