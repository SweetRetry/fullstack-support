import React from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";

const SiteHeader = () => {
  return (
    <header className="fixed top-0 z-20 flex h-16 w-full items-center justify-between bg-white px-8 dark:bg-background mobile:px-4">
      <Link href="/support" className="text-bold text-2xl">
        SweetRetry
      </Link>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </header>
  );
};

export default SiteHeader;
