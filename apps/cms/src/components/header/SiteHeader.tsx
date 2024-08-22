import React from "react";
import ThemeToggle from "./ThemeToggle";

const SiteHeader = () => {
  return (
    <header className="fixed top-0 z-20 flex h-16 items-center w-full justify-between bg-white px-8 dark:bg-background mobile:px-4">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <ThemeToggle />
    </header>
  );
};

export default SiteHeader;
