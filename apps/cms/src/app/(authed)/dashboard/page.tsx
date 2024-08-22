"use client";
import React, { useEffect, useState } from "react";
import { getArticleStatics } from "@repo/database/services/article";
import { useToast } from "@/components/ui/use-toast";
import { gsap } from "gsap";

import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);
const page = () => {
  const [count, setCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    async function run() {
      const res = await getArticleStatics();
      if (res.data?.count) {
        setCount(res.data.count);
      } else {
        toast({
          title: "获取文章数量失败",
          description: res.message,
        });
      }
    }
    run();
  });

  return <div id="count">{count}</div>;
};

export default page;
