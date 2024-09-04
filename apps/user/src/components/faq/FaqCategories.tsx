import React from "react";
import { getCategoryListByPublished } from "@repo/database/services/category";
import Link from "next/link";
const FaqCategories = async () => {
  const {
    code,
    data: categories,
    message,
  } = await getCategoryListByPublished();

  if (code !== 200 && !categories?.length) return;
  return (
    <div className="-mx-4 flex flex-wrap gap-y-4">
      {categories?.map((category) => (
        <div key={category.id} className="basis-1/3 px-4">
          <div className="cursor-pointer rounded bg-muted px-4 py-2 text-muted-foreground">
            <Link href={`/faq/${category.id}`}>
              <h3 className="text-foreground">{category.name}</h3>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqCategories;
