"use client";
import { formatLocalTime } from "@/lib/dayjsUtil";
import React from "react";

const LocalTime = ({ time }: { time: Date }) => {
  return <span>{formatLocalTime(time)}</span>;
};

export default LocalTime;
