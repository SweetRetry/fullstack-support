"use client";
import React from "react";
import RecentPublished from "./_components/RecentPublished";
import ArticleChart from "./_components/ArticleChart";
import TimerPublished from "./_components/TimerPublished";
import ArticleStatusCount from "./_components/ArticleStatusCount";
const page = () => {
  return (
    <main className="space-y-8 px-16">
      <ArticleStatusCount />
      <div className="flex space-x-8">
        <ArticleChart />
        <RecentPublished />

        {/* <TimerPublished /> */}
      </div>
    </main>
  );
};

export default page;
