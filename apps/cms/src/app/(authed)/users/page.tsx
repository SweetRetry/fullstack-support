"use client";
import { useList } from "@/hooks/useList";
import React, { useEffect, useState } from "react";
import { getUserList, UserListItem } from "@repo/database/services/user";
import { useColumns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { Modal } from "@/components/ui-extends/Modal";
const page = () => {
  const { fetch, data, totalCount, totalPage, loading } = useList(
    {},
    getUserList,
  );

  const [actionItem, setActionitem] = useState<UserListItem>();
  const [open, setOpen] = useState(false);
  const onEdit = (item: UserListItem) => {
    setActionitem(item);
    setOpen(true);
  };

  const columns = useColumns({
    onEdit,
  });

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <DataTable
        data={data}
        loading={loading}
        totalCount={totalCount}
        totalPage={totalPage}
        columns={columns}
      />
      <Modal title="Edit permission" open={open} setOpen={setOpen}>
        <div>{actionItem?.email}</div>
      </Modal>
    </>
  );
};

export default page;
