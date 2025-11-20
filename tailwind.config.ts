import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "youtube-red": "#FF0000",
        "youtube-dark": "#0F0F0F"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-bebas)", "Impact", "Arial Black", "sans-serif"]
      },
      dropShadow: {
        headline: "2px 2px 0 rgba(0,0,0,0.5)"
      },
      boxShadow: {
        guideline: "0 0 0 2px rgba(255,255,255,0.2)"
      }
    }
  },
  plugins: []
};

export default config;
