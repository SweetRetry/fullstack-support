"use client";
import SiteFooter from "@/components/footer/SiteFooter";
import SiteHeader from "@/components/header/SiteHeader";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import SiteMenu from "./_components/SiteMenu";
import { LayoutDashboard, Book, User } from "lucide-react";
import AuthProvider from "./_components/AuthProvider";

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
    name: "Roles",
    icon: <User />,
    href: "/roles",
  },
];
const AuthedLayout = ({ children }: { children: React.ReactNode }) => {
  const token = window.localStorage.getItem("token");
  if (!token) return redirect("/login");
  const pathname = usePathname();
  const activePath = pathname.split("/")[1];

  return (
    <AuthProvider token={token}>
      <section className="flex h-full">
        <aside className="w-[200px] space-y-2 p-4">
          <h2 className="mb-4 text-2xl font-bold">SweetRetry</h2>
          <SiteMenu menus={menus} activePath={`/${activePath}`} />
        </aside>
        <main className="flex h-full w-full transform flex-col">
          <SiteHeader
            name={menus.find((item) => item.href === `/${activePath}`)?.name}
          />

          <main className="mt-16 flex flex-1 flex-col px-8">
            <section className="flex-grow">{children}</section>
            <SiteFooter />
          </main>
        </main>
      </section>
    </AuthProvider>
  );
};

export default AuthedLayout;
