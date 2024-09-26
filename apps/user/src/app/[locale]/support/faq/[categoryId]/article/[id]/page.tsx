import { prisma } from "@repo/database";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import RealtedArticles from "./_components/RealtedArticles";

import Viewer from "@repo/lexical/components/Viewer";
import CategoryMenu from "../../../_components/CategoryMenu";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const data = await prisma.article.findUnique({
    where: {
      id_language: {
        id: params.id,
        language: params.locale,
      },
    },
    include: {
      category: true,
    },
  });

  return {
    title: data?.title,
    data,
  };
}
const getArticle = async (id: string, locale: string) => {
  const { data } = await generateMetadata({ params: { id, locale } });

  return data;
};

const page = async ({
  params,
}: {
  params: { id: string; locale: string; categoryId: string };
}) => {
  const t = await getTranslations({ locale: params.locale });

  const article = await getArticle(params.id, params.locale);

  if (!article?.id) redirect(`/support/faq/${params.categoryId}`);

  return (
    <main className="mt-6 flex">
      {article.categoryId && (
        <CategoryMenu categoryId={article.categoryId} locale={params.locale} />
      )}
      <section className="flex flex-1 px-8">
        <main className="flex-grow space-y-4">
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
                <BreadcrumbLink href={`/support/faq/${article.categoryId}`}>
                  {article.category?.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{article?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Viewer article={article} />
        </main>
        {article.categoryId && (
          <RealtedArticles
            categoryId={article.categoryId}
            currentArticleId={article.id}
            locale={params.locale}
          />
        )}
      </section>
    </main>
  );
};

export default page;
