import { ArticleStatus } from "@prisma/client";
import { getArticleStatusCount } from "@repo/database/services/article";
import { Book, User } from "lucide-react";
import React, { useEffect, useState } from "react";

const ArticleStatusCount = () => {
  const [lodaing, setLodaing] = useState(false);
  const [data, setData] = useState<{
    total: number;
    yesterday: number;
    increase: number;
  }>();

  useEffect(() => {
    async function run() {
      setLodaing(true);
      const res = await getArticleStatusCount();
      if (res.data) {
        setData(res.data);
      }
      setLodaing(false);
    }

    run();
  }, []);
  return (
    <ul className="-mx-4 flex items-center">
      <div className="basis-1/4 px-4">
        <li className="rounded border border-border p-4">
          <div className="mb-4 flex items-center justify-between">
            <p>Total Published</p>
            <Book />
          </div>
          <p className="text-2xl font-bold">{data?.total} article</p>
          <p className="text-muted-foreground">
            + {data?.increase} from yesterday
          </p>
        </li>
      </div>

      <div className="basis-1/4 px-4">
        <li className="rounded border border-border p-4">
          <div className="mb-4 flex items-center justify-between">
            <p>Visits</p>
            <User />
          </div>
          <p className="text-2xl font-bold">1000 visits</p>
          <p className="text-muted-foreground">+ 88 from yesterday</p>
        </li>
      </div>

      <div className="basis-1/4 px-4">
        <li className="rounded border border-border p-4">
          <div className="mb-4 flex items-center justify-between">
            <p>Visits</p>
            <User />
          </div>
          <p className="text-2xl font-bold">1000 visits</p>
          <p className="text-muted-foreground">+ 88 from yesterday</p>
        </li>
      </div>

      <div className="basis-1/4 px-4">
        <li className="rounded border border-border p-4">
          <div className="mb-4 flex items-center justify-between">
            <p>Visits</p>
            <User />
          </div>
          <p className="text-2xl font-bold">1000 visits</p>
          <p className="text-muted-foreground">+ 88 from yesterday</p>
        </li>
      </div>
    </ul>
  );
};

export default ArticleStatusCount;
