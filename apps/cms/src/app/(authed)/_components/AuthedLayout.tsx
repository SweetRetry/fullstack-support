"use client";
import SiteFooter from "@/components/footer/SiteFooter";
import SiteHeader from "@/components/header/SiteHeader";
import { usePathname } from "next/navigation";
import React from "react";
import SiteMenu from "./SiteMenu";
import { LayoutDashboard, Book, User, User2 } from "lucide-react";
import AuthProvider from "./AuthProvider";
import { getToken } from "@/lib/tokenUtil";

const menus = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    href: "/dashboard",
  },
  {
    name: "Articles",
    icon: <Book />,
    href: "/articles",
  },
  {
    name: "Users",
    icon: <User />,
    href: "/users",
  },
  {
    name: "Roles",
    icon: <User2 />,
    href: "/roles",
  },
];
const AuthedLayout = ({ children }: { children: React.ReactNode }) => {
  const token = getToken();

  const pathname = usePathname();
  const activePath = pathname.split("/")[1];

  return (
    <AuthProvider token={token}>
      <section className="flex h-full">
        <aside className="w-[200px] space-y-2 p-4">
          <h2 className="mb-4 text-center text-2xl font-bold">Exworth</h2>
          <SiteMenu menus={menus} activePath={`/${activePath}`} />
        </aside>
        <main className="flex h-full w-full transform flex-col">
          <SiteHeader
            name={menus.find((item) => item.href === `/${activePath}`)?.name}
          />

          <main className="mt-16 flex h-full flex-1 flex-col px-8">
            <section className="flex-grow">{children}</section>
            <SiteFooter />
          </main>
        </main>
      </section>
    </AuthProvider>
  );
};

export default AuthedLayout;
