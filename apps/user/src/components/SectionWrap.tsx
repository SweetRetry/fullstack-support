import { cn } from "@/lib/utils";
import React from "react";

const SectionWrap = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mobile:py-4 table:py-6 container flex flex-col justify-between gap-6 py-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SectionWrap;
