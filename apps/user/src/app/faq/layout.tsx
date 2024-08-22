import React from "react";

import SearchContainer from "@/components/SearchContainer";

const page = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-8">
      <section className="flex items-center justify-between gap-2 px-16 mobile:px-2">
        <h1 className="text-3xl font-bold mobile:text-2xl">FAQ</h1>
        <SearchContainer />
      </section>
      {children}
    </main>
  );
};

export default page;
