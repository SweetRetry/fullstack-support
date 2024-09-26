import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });

  return {
    title: t("support-center"),
    description: t("support-center-description"),
  };
}

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
