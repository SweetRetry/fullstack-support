"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { useEffect } from "react";
import Editor from "./_components/Editor";
import "./theme.css";
import { theme } from "@/lib/lexicalTheme";

// TODO：用户鉴权

const editorConfig: InitialConfigType = {
  namespace: "WritePost",

  onError(error: Error) {
    throw error;
  },

  theme,
};

export default function WriteApp({ params }: { params: { id: string } }) {
  useEffect(() => {
    document.title = "Write article | Retry";
  });

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Editor id={params.id} />
    </LexicalComposer>
  );
}
