import { Modal } from "@/components/ui-extends/Modal";
import { Role } from "@prisma/client";
import React, { useState } from "react";

const RoleEditModal = ({ role }: { role: Role }) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal title="Edit permission" open={open} setOpen={setOpen}>
      <div>{role.name}</div>
    </Modal>
  );
};

export default RoleEditModal;
