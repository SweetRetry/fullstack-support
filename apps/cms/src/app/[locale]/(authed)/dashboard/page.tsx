"use client";
import React from "react";
import RecentPublished from "./_components/RecentPublished";
import ArticleChart from "./_components/ArticleChart";
import TimerPublished from "./_components/TimerPublished";
import ArticleStatusCount from "./_components/ArticleStatusCount";
import { Tabs, TabsProps } from "antd";
import { useTranslations } from "next-intl";
const page = ({ params: { locale } }: { params: { locale: string } }) => {
  const t = useTranslations();
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("recent-published"),
      children: <RecentPublished locale={locale} />,
    },
    {
      key: "2",
      label: t("timed-releases"),
      children: <TimerPublished locale={locale} />,
    },
  ];

  return (
    <main className="container space-y-8 py-4">
      <div className="flex justify-between">
        <ArticleStatusCount />
        <ArticleChart />
      </div>

      <Tabs items={items} className="w-full" />
    </main>
  );
};

export default page;
