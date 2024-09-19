"use client";
import { useList } from "@/hooks/useList";
import React, { useEffect, useState } from "react";
import { getUserList, UserListItem } from "@repo/database/services/user";
import { useColumns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import RoleEditModal from "./_components/RoleEditModal";
import CreateUserModal from "./_components/CreateUserModal";
import { checkAuth } from "../_components/AuthProvider";
const page = () => {
  const [emailLike, setEmailLike] = useState("");

  const { fetch, data, totalCount, totalPage, loading } = useList(
    {
      emailLike,
    },
    getUserList,
  );

  const [actionItem, setActionitem] = useState<UserListItem>();
  const [open, setOpen] = useState(false);

  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

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
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <Input
          className="max-w-[300px]"
          value={emailLike}
          onChange={(e) => {
            setEmailLike(e.target.value);
            fetch();
          }}
          placeholder="Search user by email"
        />

        {checkAuth("user:create") && (
          <Button onClick={() => setCreateUserModalOpen(true)}>
            <Plus className="mr-1" width={20} height={20} />
            <span>Add Users</span>
          </Button>
        )}
      </div>
      <DataTable
        data={data}
        loading={loading}
        totalCount={totalCount}
        totalPage={totalPage}
        columns={columns}
      />
      {actionItem?.role && (
        <RoleEditModal
          open={open}
          setOpen={setOpen}
          roleId={actionItem?.role?.id}
        />
      )}
      <CreateUserModal
        open={createUserModalOpen}
        setOpen={setCreateUserModalOpen}
        onSuccess={fetch}
      />
    </div>
  );
};

export default page;
