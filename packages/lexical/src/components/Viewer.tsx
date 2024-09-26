import React from "react";
import { formatToUtcTime } from "@repo/utils/dayjsUtil";
import { getHtml } from "../utils/lexicalUtil";

const Viewer = async ({
  article,
}: {
  article: {
    content: string;
    description: string;
    title: string;
    updatedAt: Date;
  };
}) => {
  const html = await getHtml(article.content as string);

  return (
    <article className="space-y-4">
      <div className="py-2 border-b border-border">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">{article?.title}</h3>
          <p className="text-muted-foreground ">
            {article?.updatedAt && formatToUtcTime(article?.updatedAt)}
          </p>
        </div>

        <p className="mt-2 text-muted-foreground">
          <span>Description: </span>
          {article.description}
        </p>
      </div>

      <section dangerouslySetInnerHTML={{ __html: html }} className="mt-8" />
    </article>
  );
};

export default Viewer;
