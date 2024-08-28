import React from "react";
import { useState } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import ToolbarPlugin from "./plugins/ToolbarPlugin/ToolbarPlugin";

import LexicalAutoLinkPlugin from "./plugins/AutoLinkPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
// import TreeViewPlugin from "./plugins/TreeViewPlugin";
import LinkPlugin from "./plugins/LinkPlugin";

function Editor() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const [isLinkEditMode, setIsLinkEditMode] = useState(false);

  return (
    <section className="rounded-0">
      <div className="flex w-full items-center justify-between border-y border-solid border-border">
        <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
      </div>
      <div className="editor-inner">
        <RichTextPlugin
          contentEditable={
            <div ref={onRef}>
              <ContentEditable
                className="editor-input"
                aria-placeholder="Enter some rich text..."
                placeholder={
                  <div className="editor-placeholder">
                    Enter some rich text...
                  </div>
                }
              />
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <LexicalAutoLinkPlugin />
        <ListPlugin />
        <CheckListPlugin />

        <LinkPlugin />
        {/* 必須安裝LinkPlugin才可使用 */}
        {floatingAnchorElem && (
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          />
        )}
        {/* <TreeViewPlugin /> */}
      </div>
    </section>
  );
}

export default Editor;
