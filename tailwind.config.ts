import type { Config } from "tailwindcss";

const config: Config = {
  /** Include `lib/` so shared class strings (e.g. `lib/cta-styles.ts`) are scanned and not purged in production. */
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;