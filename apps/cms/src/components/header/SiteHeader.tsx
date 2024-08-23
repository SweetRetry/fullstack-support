import React from "react";
import ThemeToggle from "./ThemeToggle";

const SiteHeader = ({ name }: { name?: string }) => {
  return (
    <header className="fixed top-0 z-20 flex h-16 w-full items-center justify-between bg-white px-8 dark:bg-background mobile:px-4">
      <h1 className="text-2xl font-bold">{name}</h1>
      <ThemeToggle />
    </header>
  );
};

export default SiteHeader;
