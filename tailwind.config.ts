import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EAF3FF",
          100: "#D7E7FF",
          200: "#B8D2FF",
          300: "#8FB4FF",
          400: "#5F8EFF",
          500: "#2357C6",
          600: "#1E4AA8",
          700: "#173D8A",
          800: "#0F2B63",
          900: "#071A3A"
        },
        accent: {
          500: "#F59E0B",
          600: "#EA8A00"
        },
        ink: "#071A3A",
        mist: "#F6F9FF"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-serif", "Georgia"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(21, 33, 54, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
