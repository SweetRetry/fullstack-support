import { cn } from "@/lib/utils";

import Link from "next/link";

import React from "react";

const SiteMenu = ({
  menus,
  activePath,
}: {
  menus: { name: string; icon: React.ReactNode; href: string }[];
  activePath: string;
}) => {
  return (
    <ul className="space-y-2">
      {menus.map((menu) => (
        <li key={menu.href}>
          <Link
            href={menu.href}
            className={cn(
              "flex gap-2 rounded px-6 py-2 hover:bg-primary hover:text-primary-foreground",
              {
                "bg-primary text-primary-foreground": menu.href === activePath,
              },
            )}
          >
            {menu.icon}
            <span>{menu.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SiteMenu;
