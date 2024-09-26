"use client";

import { Article } from "@repo/database";
import { useEffect, useState } from "react";
import { getArticle } from "@repo/database/services/article";

import { LoadingSpinner } from "./LoadingSpinner";
import ClientViewer from "@repo/lexical/components/ClientViewer";

const ArticleViewer = ({ id, locale }: { id: string; locale: string }) => {
  const [article, setArticle] = useState<Article>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      setLoading(true);
      if (!id) return;

      const res = await getArticle(id, locale);
      if (res.data?.id) {
        setArticle(res.data);
      }
      setLoading(false);
    }

    run();
  }, [id]);

  if (loading) return <LoadingSpinner size="lg" />;
  if (article) return <ClientViewer article={article} />;
};

export default ArticleViewer;
