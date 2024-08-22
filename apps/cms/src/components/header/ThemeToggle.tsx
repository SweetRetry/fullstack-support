"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme } = useTheme();
  return (
    <div>
      <Sun
        className="h-full transition-all dark:hidden hover:text-primary cursor-pointer"
        onClick={() => setTheme("dark")}
      />
      <Moon
        className="h-full transition-all hidden dark:block hover:text-primary cursor-pointer"
        onClick={() => setTheme("light")}
      />
    </div>
  );
};

export default ThemeToggle;
