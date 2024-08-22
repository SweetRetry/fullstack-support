import SearchContainer from "@/components/SearchContainer";
import SectionWrap from "@/components/SectionWrap";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { formatToUtcTime } from "@/lib/dayjsExtend";
import { prisma } from "@repo/database";
import { highlightSearchText } from "@/lib/stringUtil";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) => {
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchParams.q,
          },
        },
        {
          description: {
            contains: searchParams.q,
          },
        },
      ],

      published: true,
    },
    take: 10,
    select: {
      id: true,
      title: true,
      description: true,
      publishedAt: true,
      categoryId: true,
      savedAt: true,
      Category: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <main>
      <section>
        <SectionWrap className="items-center">
          <h1 className="text-4xl font-bold">How can we help you?</h1>
          <SearchContainer value={searchParams.q} />
        </SectionWrap>
      </section>

      <section>
        <SectionWrap>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/support">FAQ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Search Result</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="space-y-4">
            {articles.length ? (
              articles.map((article, index) => (
                <div
                  key={article.id}
                  className={cn("py-4", {
                    "border-b border-solid border-border":
                      index !== articles.length - 1,
                  })}
                >
                  <div className="flex justify-between">
                    <h3>{article.title}</h3>
                    {article.publishedAt && (
                      <span className="text-muted-foreground">
                        {formatToUtcTime(article.publishedAt)}
                      </span>
                    )}
                  </div>
                  <p
                    className="my-4 whitespace-pre-line text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: highlightSearchText(
                        article.description,
                        searchParams.q
                      ),
                    }}
                  ></p>
                  <Link href={`/faq/${article.categoryId}`}>
                    <Button size="sm">{article.Category?.name}</Button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center">
                <p className="text-base text-muted-foreground">
                  Sorry, we can&apos;t find results related to your search
                </p>
              </div>
            )}
          </div>
        </SectionWrap>
      </section>
    </main>
  );
};

export default SearchPage;
