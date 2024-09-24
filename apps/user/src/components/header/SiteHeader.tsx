import React from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

const SiteHeader = () => {
  return (
    <header className="mobile:px-4 fixed top-0 z-20 flex h-16 w-full items-center justify-between bg-white px-8 dark:bg-background">
      <Link href="/" className="text-bold text-2xl">
        Exworth
      </Link>
      <ThemeToggle />
    </header>
  );
};

export default SiteHeader;
