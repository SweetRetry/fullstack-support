"use client";

import { useEffect } from "react";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { lexicalTheme } from "@repo/lexical/config/lexicalTheme";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Article } from "@prisma/client";
import { formatToUtcTime } from "@repo/utils/dayjsUtil";

const editorConfig: InitialConfigType = {
  namespace: "Article Viewer",
  theme: lexicalTheme,
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

const ClientViewer = ({ article }: { article: Article }) => {
  return (
    <article>
      <div className="py-2 ">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">{article?.title}</h3>
          <p className="text-muted-foreground">
            {article?.updatedAt && formatToUtcTime(article?.updatedAt)}
          </p>
        </div>

        <p className="mt-2 text-muted-foreground">
          <span>Description: </span>
          {article.description}
        </p>
      </div>

      <div className="py-2">
        <LexicalComposer initialConfig={editorConfig}>
          {article?.content && <Viewer content={article.content} />}
        </LexicalComposer>
      </div>
    </article>
  );
};

export default ClientViewer;
