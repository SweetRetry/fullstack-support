import SectionWrap from "@/components/SectionWrap";
import SearchContainer from "../../components/SearchContainer";
import { ArticleStatus, prisma } from "@repo/database";

import Link from "next/link";

export default async function Home() {
  const categories = await prisma.category.findMany({
    where: {
      articles: {
        some: {
          status: ArticleStatus.PUBLISHED,
        },
      },
    },
  });

  return (
    <main>
      <SectionWrap>
        <h1 className="mb-10 text-4xl font-bold">Support Center</h1>
        <h2 className="text-3xl font-semibold">Search our FAQ</h2>
        <SearchContainer />
      </SectionWrap>

      <SectionWrap>
        <h2 className="text-3xl font-semibold">FAQ Category</h2>

        <div className="-mx-4 flex flex-wrap gap-y-4">
          {categories.map((category) => (
            <div key={category.id} className="basis-1/3 px-4">
              <div className="cursor-pointer rounded bg-muted px-4 py-2 text-muted-foreground">
                <Link href={`/faq/${category.id}`}>
                  <h3 className="text-foreground">{category.name}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>
    </main>
  );
}
