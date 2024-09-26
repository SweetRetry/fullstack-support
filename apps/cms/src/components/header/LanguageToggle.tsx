"use client";

import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { Check, Languages } from "lucide-react";
import ExtendsPopover from "../ui-extends/ExtendsPopover";
import { localeArray } from "@/i18n/config";

const LanguageToggle = () => {
  const router = useRouter();

  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(locale: string) {
    if (locale === params.locale) return;
    const newPath = pathname.replace(params.locale as string, locale);
    console.log(newPath);
    router.replace(newPath);
  }

  return (
    <ExtendsPopover
      trigger={
        <Languages
          className="cursor-pointer hover:text-primary"
          width={20}
          height={20}
        />
      }
      content={
        <Command>
          <CommandList>
            <CommandGroup heading="Languages">
              {localeArray.map((locale) => (
                <CommandItem
                  key={locale.value}
                  value={locale.value}
                  className="cursor-pointer"
                  onSelect={() => onSelectChange(locale.value)}
                >
                  <span> {locale.label}</span>
                  {params.locale === locale.value ? (
                    <Check className="text-sm text-gray-400" />
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      }
    />
  );
};

export default LanguageToggle;
