import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { getUserInfo } from "@repo/database/services/user";
import { getToken } from "@/lib/tokenUtil";

const SiteHeader = ({ name }: { name?: string }) => {
  const [username, setUserName] = useState("");

  useEffect(() => {
    async function run() {
      const res = await getUserInfo(getToken());
      if (res.data) {
        setUserName(res.data.email);
      }
    }

    run()
  }, []);
  return (
    <header className="fixed top-0 z-20 flex h-16 w-full items-center justify-between bg-white px-8 dark:bg-background">
      <h1 className="text-2xl font-bold">{name}</h1>
      <div className="flex items-center space-x-2">
        <span>{username}</span>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default SiteHeader;
