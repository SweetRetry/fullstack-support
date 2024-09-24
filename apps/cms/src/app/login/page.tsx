import ThemeToggle from "@/components/header/ThemeToggle";

import { Metadata } from "next";

import UserAuthForm from "./_components/UserAuthForm";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function LoginPage() {
  return (
    <main className="flex h-full">
      <div className="flex-1 hidden pc:block border-r border-border border-solid p-6">
        <h1 className="font-bold text-2xl">Exworth</h1>
      </div>
      <div className="flex-1 p-6 flex items-center justify-center relative">
        <div className="flex justify-end h-8 absolute top-8 right-8">
          <ThemeToggle />
        </div>

        <div className="rounded max-w-[400px] w-full">
          <UserAuthForm />
        </div>
      </div>
    </main>
  );
}
