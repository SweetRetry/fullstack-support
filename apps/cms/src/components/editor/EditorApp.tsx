"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";

import "./theme.css";
import { theme } from "@/lib/lexicalTheme";
import { HeadingNode } from "@lexical/rich-text";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import EditorForm from "./EditorForm";

const editorConfig: InitialConfigType = {
  namespace: "Article Editor",

  onError(error: Error) {
    throw error;
  },

  theme,
  nodes: [HeadingNode, AutoLinkNode, LinkNode],
};

export default function EditorApp({ id }: { id: string }) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <EditorForm id={id} />
    </LexicalComposer>
  );
}
