import React, { Dispatch, SetStateAction, useState } from "react";
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
import {
  ArticleListItem,
  deleteArticle,
  postPulishArticle,
  putUpdateArticle,
} from "@repo/database/services/article";
import { formatToUtcTime } from "@repo/utils/dayjsUtil";
import { Dayjs } from "dayjs";
import { toast } from "@/components/ui/use-toast";
const ViewerToolBar = ({
  id,
  status,
  setData,
}: {
  status: ArticleStatus;
  id: string;
  setData: Dispatch<SetStateAction<ArticleListItem[]>>;
}) => {
  const {
    show: showDeleteModal,
    contextHandler,
    close: closeDeleteModal,
  } = useModal({
    danger: true,
    title: "Confirm Delete",
    description:
      "After deleting, you will not be able to recover this article.",
    content: "Are you sure you want to delete this article?",
    onConfirm: async () => {
      const token = getToken();
      if (id && token) {
        const res = await deleteArticle({ id }, token);
        if (res.data) {
          setData((prev) =>
            prev.map((item) => ({
              ...item,
              status:
                item.id === res.data ? ArticleStatus.DELETED : item.status,
            })),
          );
          closeDeleteModal();
        } else {
          toast({
            title: "Delete Failed",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      }
    },
  });

  const [open, setOpen] = useState(false);

  const [expiredAt, setExpiredAt] = useState<Dayjs>();

  const onReview = async () => {
    // 置为待发布
    putUpdateArticle({ id, status: ArticleStatus.UNPUBLISHED }, getToken());
  };
  const onPublish = async () => {
    const res = await postPulishArticle({ id, type: "now" }, getToken());
    if (res.data?.id) {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          status:
            item.id === res.data.id ? ArticleStatus.PUBLISHED : item.status,
        })),
      );
      toast({
        title: "Publish Success",
        description: "Your article has been published.",
      });
    }
  };
  const onFuturePublish = async () => {
    if (expiredAt) {
      postPulishArticle(
        { id, type: "future", expiredAt: formatToUtcTime(expiredAt) },
        getToken(),
      );
      toast({
        title: "Timed Publish Success",
        description: `Your article will be published at ${expiredAt.toString()}.`,
      });
    }
  };

  return (
    <div className="flex h-12 items-center space-x-4 border-b border-border">
      {contextHandler}
      {checkAuth("article:edit") && (
        <Button size="icon" variant="ghost">
          <Link href="/articles/editor/draft/new" className="leading-none">
            <PlusIcon />
          </Link>
        </Button>
      )}

      {checkAuth("article:edit") && (
        <Button
          size="icon"
          variant="ghost"
          disabled={status === ArticleStatus.DELETED}
        >
          <Link href={`/articles/editor/draft/${id}`} className="leading-none">
            <Edit />
          </Link>
        </Button>
      )}

      {checkAuth("article:delete") && (
        <Button
          size="icon"
          variant="ghost"
          disabled={status === ArticleStatus.DELETED}
          onClick={() => showDeleteModal()}
        >
          <Trash />
        </Button>
      )}

      {checkAuth("article:review") && (
        <Button
          size="icon"
          variant="ghost"
          disabled={status !== ArticleStatus.UNDER_REVIEW}
          onClick={() => onReview()}
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
            onClick={() => onPublish()}
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

          <Modal open={open} setOpen={setOpen} title="Timed Publish">
            <DatePicker
              showTime
              className="w-full !rounded"
              onChange={(date) => setExpiredAt(date)}
            />
            <div className="mt-4 space-x-2 text-right">
              <Button onClick={() => setOpen(false)} variant="secondary">
                Cancel
              </Button>
              <Button onClick={() => onFuturePublish()}>Confirm</Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ViewerToolBar;
