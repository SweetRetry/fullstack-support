import React from "react";
import { getCategoryListByPublished } from "@repo/database/services/category";
import Link from "next/link";
import Empty from "../Empty";

const FaqCategories = async ({ locale }: { locale: string }) => {
  const { code, data: categories } = await getCategoryListByPublished(locale);

  if (code !== 200 && !categories?.length) return;

  return (
    <div className="-mx-4 flex flex-wrap gap-y-4">
      {categories?.length ? (
        categories?.map((category) => (
          <div key={category?.id} className="basis-1/3 px-4">
            <div className="cursor-pointer rounded bg-muted px-4 py-2 text-muted-foreground">
              <Link href={`/support/faq/${category?.id}`}>
                <h3 className="text-foreground">{category?.name}</h3>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="flex w-full justify-center">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default FaqCategories;
