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
import { formatToUtcTime } from "@/lib/dayjsUtil";
import RealtedArticles from "./_components/RealtedArticles";
import { getHtml } from "@/lib/lexicalUtil";

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
    },
  });

  return {
    title: data?.title,
    data,
  };
}
const getPost = async (id: string) => {
  const { data } = await generateMetadata({ params: { id } });

  return data;
};

const page = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);

  if (!post?.id) return;

  const html = await getHtml(post.content as string);

  return (
    <main className="mt-6 flex">
      {post.categoryId && <CategoryMenu categoryId={post.categoryId} />}
      <section className="flex flex-1 px-8">
        <main className="flex-grow">
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
                <BreadcrumbLink href={`/support/faq/${post.categoryId}`}>
                  {post.category?.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">{post?.title}</h2>
            <p className="mt-2 text-muted-foreground">
              {post.updatedAt && formatToUtcTime(post.updatedAt)}
            </p>
            <article
              dangerouslySetInnerHTML={{ __html: html }}
              className="mt-8"
            />
          </div>
        </main>
        {post.categoryId && (
          <RealtedArticles
            categoryId={post.categoryId}
            currentArticleId={post.id}
          />
        )}
      </section>
    </main>
  );
};

export default page;
