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
const page = () => {
  const [emailLike, setEmailLike] = useState("");

  const { fetch, data, totalCount, totalPage, loading ,setData} = useList(
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

        <div className="flex gap-2">
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FilterIcon width={20} height={20} className="mr-1" />
                <span> Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-10 bg-background shadow">
              <DropdownMenuItem
                onClick={() => {
                  setStatus(undefined);
                  fetch();
                }}
              >
                All
              </DropdownMenuItem>
              {Object.values(ArticleStatus).map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setStatus(item);
                    fetch();
                  }}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

          <Button onClick={() => setCreateUserModalOpen(true)}>
            <Plus className="mr-1" width={20} height={20} />
            <span>Add Users</span>
          </Button>
        </div>
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

      />
    </div>
  );
};

export default page;
