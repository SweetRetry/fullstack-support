import { Book, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import React from "react";

const SiteMenu = () => {
  return (
    <ul className="space-y-4">
      <li>
        <Link
          href="/dashboard"
          className="flex gap-2 rounded bg-primary px-6 py-2 text-primary-foreground hover:bg-primary hover:text-primary-foreground"
        >
          <LayoutDashboard />
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          href="/article"
          className="flex gap-2 rounded px-6 py-2 hover:bg-primary hover:text-primary-foreground"
        >
          <Book />
          
          <span>Article</span>
        </Link>
      </li>
    </ul>
  );
};

export default SiteMenu;
