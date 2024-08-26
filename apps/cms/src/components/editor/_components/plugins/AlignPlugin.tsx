import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_ELEMENT_COMMAND } from "lexical";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import React from "react";

const AlignPlugin = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          Align
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
            }}
            aria-label="Left Align"
          >
            <AlignLeft width={20} height={20} />
            <span className="ml-1"> Left Align</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
            }}
            aria-label="Center Align"
          >
            <AlignCenter width={20} height={20} />
            <span className="ml-1">Center Align</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
            }}
            aria-label="Right Align"
          >
            <AlignRight width={20} height={20} />
            <span className="ml-1">Right Align</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
            }}
            aria-label="Justify Align"
          >
            <AlignJustify width={20} height={20} />
            <span className="ml-1">Justify Align</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AlignPlugin;
