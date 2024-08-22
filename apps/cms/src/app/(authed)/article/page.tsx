// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";
import ArticleList from "./ArticleList";

const page = () => {
  return (
    <div>
      <ArticleList />
      {/* <Tabs defaultValue="All">
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="UnderReview">Under Review</TabsTrigger>
          <TabsTrigger value="Published">Published</TabsTrigger>
        </TabsList>
        <TabsContent value="All">
          <ArticleList></ArticleList>
        </TabsContent>
        <TabsContent value="UnderReview"></TabsContent>
        <TabsContent value="Published"></TabsContent>
      </Tabs> */}
    </div>
  );
};

export default page;
