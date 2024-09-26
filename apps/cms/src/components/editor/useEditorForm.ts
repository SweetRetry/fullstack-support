import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { getArticle } from "@repo/database/services/article";
import { ArticleStatus } from "@prisma/client";

export const useEditorForm = (articalId: string, locale: string) => {
  const [status, setStatus] = useState<ArticleStatus | undefined>();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        title: z.string().min(1, { message: "Title is required" }),
        description: z.string().min(1, { message: "Description is required" }),
        categoryId: z.string().min(1, { message: "Category is required" }),
      }),
    ),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
    },
  });

  const title = form.watch("title");
  const categoryId = form.watch("categoryId");

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    async function run() {
      const { data: existArticle } = await getArticle(articalId, locale);
      if (existArticle?.id) {
        form.setValue("title", existArticle.title);
        form.setValue("description", existArticle.description);
        form.setValue("categoryId", existArticle.categoryId || "");
        editor.setEditorState(editor.parseEditorState(existArticle.content));
        setStatus(existArticle.status);
      }
    }
    articalId && articalId !== "new" && run();
  }, [articalId, form, editor]);

  return {
    form,
    title,
    categoryId,
    editor,
    status,
  };
};
