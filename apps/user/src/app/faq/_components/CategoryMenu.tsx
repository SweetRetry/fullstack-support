import { prisma } from "@repo/database";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArticleStatus } from "@repo/database/types/article";

const CategoryMenu = async ({ categoryId }: { categoryId: string }) => {
  const categroyNames = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      articles: {
        some: {
          status: ArticleStatus.Published,
        },
      },
    },
  });

  return (
    <aside className="table:py-6 w-[200px] space-y-2 border-r border-solid border-border py-8 mobile:w-fit mobile:py-4">
      {categroyNames.map((item) => (
        <Link
          key={item.id}
          href={`/faq/${item.id}`}
          className={cn(
            "block px-4 py-2 hover:bg-primary hover:text-primary-foreground mobile:px-2",
            {
              "bg-primary text-primary-foreground": item.id === categoryId,
            },
          )}
        >
          {decodeURI(item.name)}
        </Link>
      ))}
    </aside>
  );
};

export default CategoryMenu;
