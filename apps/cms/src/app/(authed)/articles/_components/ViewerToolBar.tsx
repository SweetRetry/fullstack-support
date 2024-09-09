import React, { useState } from "react";
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
  Timer,
} from "lucide-react";
import { Modal, useModal } from "@/components/ui-extends/Modal";
import { DatePicker } from "antd";
import { getToken } from "@/lib/tokenUtil";
import { postPulishArticle } from "@repo/database/services/article";
import { formatToUtcTime } from "@repo/utils/dayjsUtil";
import { Dayjs } from "dayjs";
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

  const [open, setOpen] = useState(false);

  const [expiredAt, setExpiredAt] = useState<Dayjs>();

  const onConfirm = async () => {
    if (expiredAt) {
      postPulishArticle(
        { id, type: "future", expiredAt: formatToUtcTime(expiredAt) },
        getToken(),
      );
    }
  };

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
            disabled={status === ArticleStatus.PUBLISHED}
          >
            <CornerUpLeft />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            disabled={status !== ArticleStatus.UNPUBLISHED}
          >
            <CornerUpRight />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            disabled={status !== ArticleStatus.UNPUBLISHED}
            onClick={() => setOpen(true)}
          >
            <Timer />
          </Button>

          <Modal open={open} setOpen={setOpen} title="定时发布">
            <DatePicker
              showTime
              className="w-full !rounded"
              onChange={(date) => setExpiredAt(date)}
            />
            <div className="mt-4 space-x-2 text-right">
              <Button onClick={() => setOpen(false)} variant="secondary">
                Cancel
              </Button>
              <Button onClick={() => onConfirm()}>Confirm</Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ViewerToolBar;
