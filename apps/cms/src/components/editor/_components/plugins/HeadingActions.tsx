import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { HeadingTagType, $createHeadingNode } from "@lexical/rich-text";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CustomHeadingActions = () => {
  const [editor] = useLexicalComposerContext();

  const handleOnClick = (tag: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          Headings
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {(["h1", "h2", "h3", "h4", "h5"] as Array<HeadingTagType>).map(
          (tag) => {
            return (
              <DropdownMenuItem key={tag}>
                <Button
                  variant="ghost"
                  onClick={() => handleOnClick(tag)}
                  size="sm"
                >
                  {tag}
                </Button>
              </DropdownMenuItem>
            );
          },
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
