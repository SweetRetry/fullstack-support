"use client";

import { Button } from "@/components/ui/button";

import { formatToUtcTime } from "@repo/utils/dayjsUtil";

import { ColumnDef } from "@tanstack/react-table";

import { Edit } from "lucide-react";
import { Role } from "@prisma/client";

export const useColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (roleId: string) => void;
  onDelete: (roleId: string) => void;
}) => {
  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "name",
      header: "Role",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Created at",
      cell: ({ row }) => (
        <div>{formatToUtcTime(row.getValue("createdAt"))}</div>
      ),
    },
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
        <div className="space-x-2 text-right">
          {row.original.editable ? (
            <>
              <Button variant="link" onClick={() => onEdit(row.original.id)}>
                <span>Edit</span>
              </Button>

              <Button variant="ghost" onClick={() => onDelete(row.original.id)}>
                <span className="text-red-500">Delete</span>
              </Button>
            </>
          ) : (
            <span> -- </span>
          )}
        </div>
      ),
    },
  ];

  return columns;
};
