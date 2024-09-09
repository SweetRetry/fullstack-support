"use client";
import { getArticleAnlytics } from "@repo/database/services/anlytics";
import React, { useEffect } from "react";
import { EChartsOption, init } from "echarts";

const option: EChartsOption = {
  title: {
    text: "Article Status",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Article Status",
      type: "pie",
      radius: "50%",
      data: [] as Array<{ value: number; name: string }>,
      label: {
        show: true,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
const ArticleChart = () => {
  useEffect(() => {
    async function run() {
      const res = await getArticleAnlytics();
      if (res.code === 200 && res.data) {
        const chartDom = document.getElementById("article-pie-chart");
        const myChart = init(chartDom);
        (option.series as { data: any }[])[0].data = res.data?.map((item) => {
          return {
            value: item._count,
            name: item.status,
          };
        });
        myChart.setOption(option);
      }
    }

    run();
  }, []);

  return (
    <div
      id="article-pie-chart"
      style={{ width: 600, height: 400 }}
      className="w-full"
    ></div>
  );
};

export default ArticleChart;
