import { prisma } from "@repo/database";

import CategoryMenu from "../../_components/CategoryMenu";
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

export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await prisma.article.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      categoryId: true,
      category: true,
      updatedAt: true,
      description: true,
    },
  });

  return {
    title: data?.title,
    data,
  };
}
const getArticle = async (id: string) => {
  const { data } = await generateMetadata({ params: { id } });

  return data;
};

const page = async ({ params }: { params: { id: string } }) => {
  const article = await getArticle(params.id);

  if (!article?.id) return;

  return (
    <main className="mt-6 flex">
      {article.categoryId && <CategoryMenu categoryId={article.categoryId} />}
      <section className="flex flex-1 px-8">
        <main className="flex-grow space-y-4">
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
          />
        )}
      </section>
    </main>
  );
};

export default page;
