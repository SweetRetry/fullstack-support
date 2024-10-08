/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  ElementFormatType,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { $isListNode, ListNode } from "@lexical/list";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { Dispatch, useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Bold,
  ImageIcon,
  Italic,
  Link,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";
import { BlockFormatDropdown } from "./BlockFormatDropdown";
import AlignPlugin from "./AlignPlugin";
import { cn } from "@/lib/utils";
import { sanitizeUrl } from "@/lib/url";
import { getSelectedNode } from "@/lib/getSelectedNode";
import { $isHeadingNode } from "@lexical/rich-text";
import { BlockType, blockTypeToBlockNameMap } from "./tool";
import { $isParentElementRTL } from "@lexical/selection";
import { InsertImageDialog } from "../ImagesPlugin";
import { Modal } from "@/components/ui-extends/Modal";
import dynamic from "next/dynamic";

export default function ToolbarPlugin({
  setIsLinkEditMode,
}: {
  setIsLinkEditMode: Dispatch<boolean>;
}) {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [blockType, setBlockType] = useState<BlockType>("paragraph");
  const [elementFormat, setElementFormat] = useState<ElementFormatType>("left");
  const [isRTL, setIsRTL] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      // Update blockType
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode,
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockNameMap) {
            setBlockType(type as BlockType);
          }
        }
      }

      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
        );
      }

      // If matchingParent is a valid node, pass it's format type
      setElementFormat(
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
            ? node.getFormatType()
            : parent?.getFormatType() || "left",
      );

      // If matchingParent is a valid node, pass it's format type
      setElementFormat(
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
            ? node.getFormatType()
            : parent?.getFormatType() || "left",
      );
    }
  }, [activeEditor, editor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, $updateToolbar]);

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      $updateToolbar();
    });
  }, [activeEditor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [$updateToolbar, activeEditor, editor]);

  const insertLink = useCallback(() => {
    if (!isLink) {
      setIsLinkEditMode(true);
      activeEditor.dispatchCommand(
        TOGGLE_LINK_COMMAND,
        sanitizeUrl("https://"),
      );
    } else {
      setIsLinkEditMode(false);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [activeEditor, isLink, setIsLinkEditMode]);

  const [insertImageModalOpen, setInsertImageModalOpen] = useState(false);

  return (
    <div className="flex h-12 items-center gap-2 p-2" ref={toolbarRef}>
      <Button
        variant="ghost"
        size="icon"
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        aria-label="Undo"
      >
        <Undo width={20} height={20} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        aria-label="Redo"
      >
        <Redo width={20} height={20} />
      </Button>

      <Separator orientation="vertical" />

      <BlockFormatDropdown editor={activeEditor} blockType={blockType} />

      <Separator orientation="vertical" />

      <AlignPlugin elementFormat={elementFormat} isRTL={isRTL} />

      <Separator orientation="vertical" />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={cn({ "bg-muted": isBold })}
        aria-label="Format Bold"
      >
        <Bold width={20} height={20} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={cn({ "bg-muted": isItalic })}
        aria-label="Format Italics"
      >
        <Italic width={20} height={20} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={cn({ "bg-muted": isUnderline })}
        aria-label="Format Underline"
      >
        <Underline width={20} height={20} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={cn({ "bg-muted": isStrikethrough })}
        aria-label="Format Strikethrough"
      >
        <Strikethrough width={20} height={20} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={insertLink}
        aria-label="Justify Align"
      >
        <Link width={20} height={20} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setInsertImageModalOpen(true)}
      >
        <ImageIcon />
      </Button>

      <Modal
        title="Insert Image"
        open={insertImageModalOpen}
        setOpen={setInsertImageModalOpen}
      >
        <InsertImageDialog
          activeEditor={activeEditor}
          onClose={() => setInsertImageModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
