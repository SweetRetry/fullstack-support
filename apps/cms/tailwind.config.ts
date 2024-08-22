import type { Config } from "tailwindcss";

const config = {
  presets: [require("@repo/tailwind-config")],
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
} satisfies Config;

export default config;
