"use client";

import { Button } from "@/components/ui/button";

import { formatToUtcTime } from "@repo/utils/dayjsUtil";

import { UserListItem } from "@repo/database/services/user";
import { ColumnDef } from "@tanstack/react-table";

export const useColumns = ({
  onEdit,
}: {
  onEdit: (roleId?: string) => void;
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
          <Button variant="link" onClick={() => onEdit(row.original.role?.id)}>
            <span>Check</span>
          </Button>
        </div>
      ),
    },
  ];

  return columns;
};
