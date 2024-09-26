"use client";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { Check, Plus } from "lucide-react";
import { Category } from "@prisma/client";
import SrInput from "../ui-extends/SrInput";
import { Button } from "../ui/button";

import { useDebounceFn } from "ahooks";
import {
  postCreateNewCategory,
  getCategoryList,
} from "@repo/database/services/category";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

const CategorySelect = ({
  onSelect,
  locale,
}: {
  onSelect: (value: string, category: Category) => void;
  locale: string;
}) => {
  const t = useTranslations();
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState("");

  const [creating, setCreating] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  const { toast } = useToast();

  const onAddCatrgory = async () => {
    const category = await postCreateNewCategory(newCategoryName, locale);
    if (category.id) {
      setCategories([...categories, category]);
    } else {
      toast({
        title: t("create-new-category-failed"),
      });
    }
    setNewCategoryName("");
    setCreating(false);
  };

  const { run: onSearchValueChange } = useDebounceFn(
    async (value: string) => {
      setSearchValue(value);
      const res = await getCategoryList(value);
      if (res.data) {
        setCategories(res.data);
      }
    },
    {
      wait: 200,
    },
  );

  useEffect(() => {
    onSearchValueChange("");
  }, []);

  return (
    <Command>
      <CommandInput
        placeholder={t("search-category")}
        value={searchValue}
        onValueChange={(value) => onSearchValueChange(value)}
      />
      <CommandList>
        <CommandEmpty>{t("no-category-found")}</CommandEmpty>
        <CommandGroup>
          {categories.map((category) => (
            <CommandItem
              key={category.id}
              value={category.id}
              onSelect={(currentValue) => {
                setValue(currentValue === value ? "" : currentValue);
                onSelect(currentValue, category);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === category.id ? "opacity-100" : "opacity-0",
                )}
              />
              {category.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>

      <div className="p-2">
        {creating ? (
          <SrInput
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            suffixIcon={
              <Button size="sm" onClick={onAddCatrgory}>
                {t("add")}
              </Button>
            }
          />
        ) : (
          <div
            className="mt-2 flex cursor-pointer items-center justify-center rounded border border-dotted border-border py-1 text-muted-foreground hover:bg-muted"
            onClick={() => setCreating(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>{t("add-new-category")} </span>
          </div>
        )}
      </div>
    </Command>
  );
};

export default CategorySelect;
