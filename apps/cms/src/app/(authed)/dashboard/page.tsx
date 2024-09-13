"use client";
import React from "react";
import RecentPublished from "./_components/RecentPublished";
import ArticleChart from "./_components/ArticleChart";
const page = () => {
  return (
    <main>
      <ArticleChart />
      <RecentPublished />
    </main>
  );
};

export default page;
