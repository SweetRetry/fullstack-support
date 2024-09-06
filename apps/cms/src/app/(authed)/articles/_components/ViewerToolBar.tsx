import React from "react";
import { checkAuth } from "../../_components/AuthProvider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArticleStatus } from "@prisma/client";
import {
  PlusIcon,
  Edit,
  Check,
  Trash,
  CornerUpLeft,
  CornerUpRight,
} from "lucide-react";
import { useModal } from "@/components/ui-extends/Modal";

const ViewerToolBar = ({
  id,
  status,
}: {
  status: ArticleStatus;
  id: string;
}) => {
  const { show, contextHandler, close } = useModal({
    title: "Delete Article",
    content: "Are you sure you want to delete this article?",
    onConfirm: async () => {},
  });
  
  return (
    <div className="flex h-12 items-center space-x-4 border-b border-border">
      {checkAuth("article:edit") && (
        <Link href="/articles/editor/draft/new" className="leading-none">
          <Button size="icon" variant="ghost">
            <PlusIcon />
          </Button>
        </Link>
      )}

      {checkAuth("article:edit") && (
        <Link href={`/articles/editor/draft/${id}`} className="leading-none">
          <Button
            size="icon"
            variant="ghost"
            disabled={status === ArticleStatus.DELETED}
          >
            <Edit />
          </Button>
        </Link>
      )}

      {checkAuth("article:delete") && (
        <Button
          size="icon"
          variant="ghost"
          disabled={status === ArticleStatus.DELETED}
        >
          <Trash />
        </Button>
      )}

      {checkAuth("article:review") && (
        <Button
          size="icon"
          variant="ghost"
          disabled={status !== ArticleStatus.UNDER_REVIEW}
        >
          <Check />
        </Button>
      )}

      {checkAuth("article:publish") && (
        <>
          <Button
            size="icon"
            variant="ghost"
            disabled={status !== ArticleStatus.DRAFT}
          >
            <CornerUpLeft />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            disabled={status !== ArticleStatus.DRAFT}
          >
            <CornerUpRight />
          </Button>
        </>
      )}
    </div>
  );
};

export default ViewerToolBar;
