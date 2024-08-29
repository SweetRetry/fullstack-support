"use client";

import { useModal } from "@/components/ui-extends/Modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatToUtcTime } from "@/lib/dayjsUtil";
import {
  ArticleListItem,
  getArticleList,
} from "@repo/database/services/article";
import { ColumnDef } from "@tanstack/react-table";

import { Delete, Edit, Eye, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const useColumns = ({
  onOpenDeleteModal,
  onOpenPreviewModal,
}: {
  onOpenDeleteModal: (item: ArticleListItem) => void;
  onOpenPreviewModal: (item: ArticleListItem) => void;
}) => {
  const router = useRouter();

  const columns: ColumnDef<ArticleListItem>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div>{row.getValue("status")}</div>,
    },
    // 所属目录
    {
      accessorKey: "dependencyCategory",
      header: "Dependency Category",
      cell: ({ row }) => <div>{row.original.category?.name || "--"}</div>,
    },
    {
      accessorKey: "updatedAt",
      header: "UpdatedAt",
      cell: ({ row }) => (
        <div>{formatToUtcTime(row.getValue("updatedAt"))}</div>
      ),
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-haspopup="true">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => onOpenPreviewModal(row.original)}
              >
                <Eye width={16} height={16} className="mr-1" />
                <span>Preview</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/article/editor/draft/${row.original.id}`)
                }
              >
                <Edit width={16} height={16} className="mr-1" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenDeleteModal(row.original)}>
                <Delete width={16} height={16} className="mr-1" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return columns;
};
