"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme } = useTheme();
  return (
    <div>
      <Sun
        className="cursor-pointer transition-all hover:text-primary dark:hidden"
        width={20}
        height={20}
        onClick={() => setTheme("dark")}
      />
      <Moon
        className="hidden cursor-pointer transition-all hover:text-primary dark:block"
        width={20}
        height={20}
        onClick={() => setTheme("light")}
      />
    </div>
  );
};

export default ThemeToggle;
