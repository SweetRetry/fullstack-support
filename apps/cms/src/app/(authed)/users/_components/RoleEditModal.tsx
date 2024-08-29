import { Modal } from "@/components/ui-extends/Modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getRolePermissionsById } from "@repo/database/services/role";
import React, { useEffect, useState } from "react";

const RoleEditModal = ({
  roleId,
  open,
  setOpen,
}: {
  roleId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [permissionGroup, setPermissionGroup] = useState<
    Record<
      string,
      {
        isChecked: boolean;
        id: string;
        name: string;
        description: string | null;
      }[]
    >
  >();

  useEffect(() => {
    async function run() {
      const res = await getRolePermissionsById(roleId);
      if (res.data?.length) {
        const _permissions: Record<
          string,
          {
            isChecked: boolean;
            id: string;
            name: string;
            description: string | null;
          }[]
        > = {};

        res.data.forEach((permission) => {
          const [group, _] = permission.name.split(":");
          if (!_permissions[group]) {
            _permissions[group] = [];
          }
          _permissions[group].push(permission);
        });

        setPermissionGroup(_permissions);
      }
    }
    open && run();
  }, [roleId, open]);

  return (
    <Modal title="Edit permission" open={open} setOpen={setOpen}>
      <div className="space-y-4">
        {Object.entries(permissionGroup ?? {}).map(([group, permissions]) => (
          <div key={group}>
            <p className="mb-2">{group}</p>
            <div className="-mx-2 flex flex-wrap items-center gap-y-2">
              {permissions.map((permission) => (
                <div
                  className="box-border flex w-1/3 items-center space-x-2 px-2"
                  key={permission.id}
                >
                  <Checkbox
                    checked={permission.isChecked}
                    onCheckedChange={(checked) => {
                      setPermissionGroup((prev) => {
                        return {
                          ...prev,
                          [group]: prev?.[group].map((p) => ({
                            ...p,
                            isChecked:
                              p.id === permission.id ? checked : p.isChecked,
                          })),
                        };
                      });
                    }}
                  />
                  <label>{permission.name}</label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => {}}>Confirm</Button>
        </div>
      </div>
    </Modal>
  );
};

export default RoleEditModal;
