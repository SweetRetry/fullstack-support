"use client";
import React from "react";
import RecentPublished from "./_components/RecentPublished";
import ArticleChart from "./_components/ArticleChart";
import TimerPublished from "./_components/TimerPublished";
const page = () => {
  return (
    <main>
      <ArticleChart />
      <div className="flex space-x-6 mt-6">
        <RecentPublished />
        <TimerPublished />
      </div>
    </main>
  );
};

export default page;
