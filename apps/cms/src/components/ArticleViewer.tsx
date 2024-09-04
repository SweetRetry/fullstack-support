"use client";

import { Article, prisma } from "@repo/database";
import { formatToUtcTime } from "@/lib/dayjsUtil";
import { theme } from "@/lib/lexicalTheme";
import { useEffect, useState } from "react";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { getArticle } from "@repo/database/services/article";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const editorConfig: InitialConfigType = {
  namespace: "Article Viewer",
  theme: theme,
  onError: (e: Error) => {
    console.error(e);
  },
  editable: false,
};

const Viewer = ({ content }: { content: string }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditorState(editor.parseEditorState(content));
  }, [content]);

  return (
    <RichTextPlugin
      contentEditable={
        <ContentEditable
          className="editor-input"
          aria-placeholder="Enter some rich text..."
          placeholder={
            <div className="editor-placeholder">Enter some rich text...</div>
          }
        />
      }
      ErrorBoundary={LexicalErrorBoundary}
    />
  );
};
const ArticleViewer = ({ id }: { id?: string }) => {
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    async function run() {
      if (!id) return;
      const res = await getArticle(id);
      if (res.data?.id) {
        setArticle(res.data);
      }
    }

    run();
  }, [id]);

  return (
    <article className="flex-1 border border-border p-4">
      <h2 className="text-2xl font-bold">{article?.title}</h2>
      <p className="mt-2 text-muted-foreground">
        {article?.updatedAt && formatToUtcTime(article?.updatedAt)}
      </p>
      <LexicalComposer initialConfig={editorConfig}>
        {article?.content && <Viewer content={article.content} />}
      </LexicalComposer>
    </article>
  );
};

export default ArticleViewer;
