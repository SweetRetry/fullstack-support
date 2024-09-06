"use client";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatToUtcTime } from "@repo/utils/dayjsUtil";

import { UserListItem } from "@repo/database/services/user";
import { ColumnDef } from "@tanstack/react-table";

import { Edit, MoreHorizontal } from "lucide-react";

export const useColumns = ({
  onEdit,
}: {
  onEdit: (item: UserListItem) => void;
}) => {
  const columns: ColumnDef<UserListItem>[] = [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div>{row.original.role?.description}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Created at",
      cell: ({ row }) => (
        <div>{formatToUtcTime(row.getValue("createdAt"))}</div>
      ),
    },
    // 所属目录
    {
      accessorKey: "updatedAt",
      header: "Updated at",
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
                onClick={() => onEdit(row.original)}
                disabled={!row.original.role?.editable}
              >
                <Edit width={16} height={16} className="mr-2" />
                <span>Edit</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return columns;
};
