"use client";
import { getArticleAnlytics } from "@repo/database/services/article";
import React, { useEffect, useState } from "react";

type Anlytics = Awaited<ReturnType<typeof getArticleAnlytics>>["data"];
const ArticleChart = () => {
  const [anlytics, setAnlytics] = useState<Anlytics>();

  useEffect(() => {
    async function run() {
      const res = await getArticleAnlytics();
      if (res.code === 200) {
        res.data && setAnlytics(res.data);
      }
    }

    run();
  }, []);
  return <div>12312</div>;
};

export default ArticleChart;
