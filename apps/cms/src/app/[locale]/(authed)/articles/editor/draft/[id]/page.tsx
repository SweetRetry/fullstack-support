"use client";

import { useEffect } from "react";

import EditorApp from "@/components/editor/EditorApp";

export default function WriteApp({
  params,
}: {
  params: { id: string; locale: string };
}) {
  useEffect(() => {
    document.title = "Write article | Retry";
  });

  return <EditorApp id={params.id} locale={params.locale} />;
}
