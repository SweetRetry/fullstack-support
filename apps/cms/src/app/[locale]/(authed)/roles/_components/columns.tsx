"use client";

import { Button } from "@/components/ui/button";

import { formatToUtcTime } from "@repo/utils/dayjsUtil";

import { ColumnDef } from "@tanstack/react-table";

import { Role } from "@prisma/client";
import { useTranslations } from "next-intl";

export const useColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (roleId: string) => void;
  onDelete: (roleId: string) => void;
}) => {
  const t = useTranslations();

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "name",
      header: t("role-name"),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: t("created-at"),
      cell: ({ row }) => (
        <div>{formatToUtcTime(row.getValue("createdAt"))}</div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: t("updated-at"),
      cell: ({ row }) => (
        <div>{formatToUtcTime(row.getValue("updatedAt"))}</div>
      ),
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-right">{t("operations")}</div>,
      cell: ({ row }) => (
        <div className="space-x-2 text-right">
          {row.original.editable ? (
            <>
              <Button variant="link" onClick={() => onEdit(row.original.id)}>
                <span>{t("edit")}</span>
              </Button>

              <Button variant="ghost" onClick={() => onDelete(row.original.id)}>
                <span className="text-red-500">{t("delete")}</span>
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
