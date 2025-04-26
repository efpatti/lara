// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
 content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
 theme: {
  extend: {
   fontFamily: {
    inter: ["var(--font-inter)", "sans-serif"],
    sora: ["var(--font-sora)", "sans-serif"],
   },
  },
 },
 plugins: [],
};

export default config;
