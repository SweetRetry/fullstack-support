import React from "react";
import { formatToUtcTime } from "@repo/utils/dayjsUtil";
import { getHtml } from "../utils/lexicalUtil";

const Viewer = async ({
  article,
}: {
  article: {
    content: string;
    title: string;
    updatedAt: Date;
  };
}) => {
  const html = await getHtml(article.content as string);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">{article?.title}</h2>
      <p className="mt-2 text-muted-foreground">
        {article.updatedAt && formatToUtcTime(article.updatedAt)}
      </p>
      <article dangerouslySetInnerHTML={{ __html: html }} className="mt-8" />
    </div>
  );
};

export default Viewer;
