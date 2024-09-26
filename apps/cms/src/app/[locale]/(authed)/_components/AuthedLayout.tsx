"use client";
import SiteFooter from "@/components/footer/SiteFooter";
import SiteHeader from "@/components/header/SiteHeader";
import { usePathname } from "next/navigation";
import React from "react";
import SiteMenu from "./SiteMenu";
import { LayoutDashboard, Book, User, User2 } from "lucide-react";
import AuthProvider from "./AuthProvider";
import { getToken } from "@/lib/tokenUtil";
import { useTranslations } from "next-intl";

const AuthedLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();

  const menus = [
    {
      name: t("dashboard"),
      icon: <LayoutDashboard />,
      href: "/dashboard",
    },
    {
      name: t("articles-management"),
      icon: <Book />,
      href: "/articles",
    },
    {
      name: t("users-management"),
      icon: <User />,
      href: "/users",
    },
    {
      name: t("roles-managment"),
      icon: <User2 />,
      href: "/roles",
    },
  ];

  const token = getToken();

  const pathname = usePathname();
  const activePath = pathname.split("/")[2];

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
