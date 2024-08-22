"use client";
import SiteFooter from "@/components/footer/SiteFooter";
import SiteHeader from "@/components/header/SiteHeader";
import { redirect } from "next/navigation";
import React from "react";
import SiteMenu from "./_components/SiteMenu";

const layout = ({ children }: { children: React.ReactNode }) => {
  const token = window.localStorage.getItem("token");
  if (token)
    return (
      <section className="flex h-full">
        <aside className="w-[200px] space-y-2 p-4">
          <h2 className="mb-4 text-2xl font-bold">SweetRetry</h2>
          <SiteMenu />
        </aside>
        <main className="flex h-full w-full transform flex-col">
          <SiteHeader />

          <main className="mt-16 flex flex-1 flex-col px-8">
            <section className="flex-grow ">{children}</section>
            <SiteFooter />
          </main>
        </main>
      </section>
    );

  return redirect("/login");
};

export default layout;
export const config = { ssr: false };
