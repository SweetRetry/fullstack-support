"use client";
import { getArticleAnlytics } from "@repo/database/services/anlytics";
import React, { useEffect } from "react";
import { EChartsOption, init } from "echarts";
import { useTranslations } from "next-intl";
import { useArticleTranslate } from "@/hooks/useArticle";
import { ArticleStatus } from "@prisma/client";

const ArticleChart = ({ locale }: { locale: string }) => {
  const t = useTranslations();
  const { ArticleStatusTranslate } = useArticleTranslate();

  const option: EChartsOption = {
    title: {
      text: t("article-status"),
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
        name: t("article-status"),
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

  useEffect(() => {
    async function run() {
      const res = await getArticleAnlytics(locale);
      if (res.code === 200 && res.data) {
        const chartDom = document.getElementById("article-pie-chart");
        const myChart = init(chartDom);
        (option.series as { data: any }[])[0].data = Object.entries(
          res.data,
        ).map(([label, value]) => {
          return {
            name: ArticleStatusTranslate[label],
            value: value,
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
      style={{ width: 400, height: 130 }}
      className="w-full"
    />
  );
};

export default ArticleChart;
