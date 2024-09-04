import { Modal } from "@/components/ui-extends/Modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  getRolePermissionsById,
  putRolePermissionsUpdate,
} from "@repo/database/services/role";
import React, { useEffect, useRef, useState } from "react";

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

  const initPermissions = useRef<string[]>();

  const onConfirm = async () => {
    if (!initPermissions.current) return;
    if (!permissionGroup) return;
    const changedPermissionIds = Object.values(permissionGroup)
      .flat()
      .filter((item) => item.isChecked)
      .map((item) => item.id);

    const res = await putRolePermissionsUpdate({
      roleId,
      permissions: changedPermissionIds,
    });

    if (res.code === 200 && res.data) {
      setOpen(false);
    }
  };

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

        initPermissions.current = res.data
          .filter((item) => item.isChecked)
          .map((item) => item.id);

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
        {permissionGroup &&
          Object.entries(permissionGroup).map(([group, permissions]) => (
            <div key={group}>
              <p className="mb-2">{group}</p>
              <div className="-mx-2 flex flex-wrap items-center gap-y-2">
                {permissions.map((permission) => (
                  <div
                    className="flex basis-1/2 items-center space-x-2 px-2"
                    key={permission.id}
                  >
                    <Checkbox
                      aria-describedby={permission.id}
                      checked={permission.isChecked}
                      onCheckedChange={(checked: boolean) => {
                        setPermissionGroup((prev) => {
                          if (!prev) return;
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
          <Button onClick={() => onConfirm()}>Confirm</Button>
        </div>
      </div>
    </Modal>
  );
};

export default RoleEditModal;
