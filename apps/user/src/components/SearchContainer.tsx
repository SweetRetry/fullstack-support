import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

import React from "react";

const SearchContainer = ({ value }: { value?: string }) => {
  const t = useTranslations();
  return (
    <form
      className="relative w-[500px] mobile:w-full"
      action="/support/search"
      method="GET"
    >
      <Input
        name="q"
        defaultValue={value}
        autoComplete="off"
        placeholder={t("search-help-articles")}
        className="focus-visible::ring-transparent h-12 border-none bg-muted px-8 placeholder:text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <div className="absolute left-2 top-0 flex h-full items-center">
        <Search width={16} height={16} className="text-muted-foreground" />
      </div>

      <div className="absolute right-2 top-0 flex h-full items-center">
        <Button type="submit">{t("search")}</Button>
      </div>
    </form>
  );
};

export default SearchContainer;
