"use client";

import { useEffect } from "react";

import { Modal } from "@/components/ui-extends/Modal";
import { useRouter } from "next/navigation";

import EditorApp from "@/components/editor/EditorApp";
import { useTranslations } from "next-intl";

export default function WriteApp({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const t = useTranslations();
  const router = useRouter();
  useEffect(() => {
    document.title = t("write-article");
  });

  return (
    <Modal
      open={true}
      setOpen={() => router.back()}
      title={t("write-article")}
      limitHeight
      width={900}
    >
      <EditorApp id={params.id} locale={params.locale} />
    </Modal>
  );
}
