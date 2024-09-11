import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ElementFormatType, FORMAT_ELEMENT_COMMAND } from "lexical";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, ChevronDown } from "lucide-react";
import React from "react";

const elementFormatType: Record<
  Exclude<ElementFormatType, "">,
  { icon: JSX.Element; label: string; iconRTL: JSX.Element }
> = {
  left: {
    icon: <AlignLeft />,
    iconRTL: <AlignLeft />,
    label: "Left Align",
  },
  center: {
    icon: <AlignCenter />,
    iconRTL: <AlignCenter />,
    label: "Center Align",
  },
  right: {
    icon: <AlignRight />,
    iconRTL: <AlignRight />,
    label: "Right Align",
  },
  justify: {
    icon: <AlignJustify />,
    iconRTL: <AlignJustify />,
    label: "Justify Align",
  },
  start: {
    icon: <AlignLeft />,
    iconRTL: <AlignRight />,
    label: "Start Align",
  },
  end: {
    icon: <AlignRight />,
    iconRTL: <AlignLeft />,
    label: "End Align",
  },
};
const AlignPlugin = ({
  elementFormat,
  isRTL,
}: {
  elementFormat: ElementFormatType;
  isRTL: boolean;
}) => {
  const [editor] = useLexicalComposerContext();
  const formatOption = elementFormatType[elementFormat || "left"];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="capitalize">
          <span className="mr-1">{formatOption.icon}</span>
          {formatOption.label}
          <ChevronDown width={16} height={16} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={elementFormat}>
          {Object.entries(elementFormatType).map(([key, value]) => (
            <DropdownMenuRadioItem
              key={key}
              value={key}
              onClick={() => {
                editor.dispatchCommand(
                  FORMAT_ELEMENT_COMMAND,
                  key as ElementFormatType,
                );
              }}
            >
              {isRTL ? value.iconRTL : value.icon}
              <span className="ml-1">{value.label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AlignPlugin;
