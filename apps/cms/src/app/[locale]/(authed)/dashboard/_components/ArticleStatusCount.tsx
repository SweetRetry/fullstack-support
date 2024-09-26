import { getArticleStatusCount } from "@repo/database/services/article";
import { Book } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const ArticleStatusCount = () => {
  const t = useTranslations();

  const [data, setData] = useState<{
    total: number;
    yesterday: number;
    increase: number;
  }>();

  useEffect(() => {
    async function run() {
      const res = await getArticleStatusCount();
      if (res.data) {
        setData(res.data);
      }
    }

    run();
  }, []);
  return (
    <ul className="-mx-4 flex items-center flex-1">
      <div className="basis-1/3 px-4">
        <li className="rounded border border-border p-4">
          <div className="mb-4 flex items-center justify-between">
            <p>{t("total-published")}</p>
            <Book />
          </div>
          <p className="text-2xl font-bold">
            {t("count-article", { count: data?.total || 0 })}
          </p>
          <p className="text-muted-foreground">
            {t("count-increase-from-yesterday", { count: data?.increase || 0 })}
          </p>
        </li>
      </div>
    </ul>
  );
};

export default ArticleStatusCount;
