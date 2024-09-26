"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { theme } from "@/lib/lexicalTheme";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";

import EditorForm from "./EditorForm";
import "./theme.css";
import { ImageNode } from "@repo/lexical/nodes/ImageNode";

const editorConfig: InitialConfigType = {
  namespace: "Article Editor",

  onError(error: Error) {
    throw error;
  },

  theme,

  nodes: [
    HeadingNode,
    AutoLinkNode,
    LinkNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    ImageNode,
  ],
};

export default function EditorApp({
  id,
  locale,
}: {
  id: string;
  locale: string;
}) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <EditorForm id={id} locale={locale} />
    </LexicalComposer>
  );
}
