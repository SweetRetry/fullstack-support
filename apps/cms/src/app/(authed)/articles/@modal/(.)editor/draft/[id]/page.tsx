"use client";

import { useEffect } from "react";

import { Modal } from "@/components/ui-extends/Modal";
import { useRouter } from "next/navigation";

import EditorApp from "@/components/editor/EditorApp";

export default function WriteApp({ params }: { params: { id: string } }) {
  const router = useRouter();
  useEffect(() => {
    document.title = "Write article | Retry";
  });

  return (
    <Modal
      open={true}
      setOpen={() => router.back()}
      title="Write article"
      limitHeight
      width={1000}
    >
      <EditorApp id={params.id} />
    </Modal>
  );
}
