import ThemeToggle from "@/components/header/ThemeToggle";

import { Metadata } from "next";

import UserAuthForm from "./_components/UserAuthForm";
import LanguageToggle from "@/components/header/LanguageToggle";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function LoginPage() {
  return (
    <main className="flex h-full">
      <div className="hidden flex-1 border-r border-solid border-border p-6 pc:block">
        <h1 className="text-2xl font-bold">SweetRetry</h1>
      </div>
      <div className="relative flex flex-1 items-center justify-center p-6">
        <div className="absolute right-8 top-8 flex h-8 justify-end items-center space-x-3">
          <ThemeToggle />
          <LanguageToggle />
        </div>

        <div className="w-full max-w-[400px] rounded">
          <UserAuthForm />
        </div>
      </div>
    </main>
  );
}
