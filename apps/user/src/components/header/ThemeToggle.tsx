"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme } = useTheme();
  return (
    <div>
      <Sun
        className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden hover:text-primary cursor-pointer"
        onClick={() => setTheme("dark")}
      />
      <Moon
        className="h-[1.2rem] w-[1.2rem] transition-all hidden dark:block hover:text-primary cursor-pointer"
        onClick={() => setTheme("light")}
      />
    </div>
  );
};

export default ThemeToggle;