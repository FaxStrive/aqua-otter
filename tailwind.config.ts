import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'ClashDisplay-Variable'", "system-ui", "sans-serif"],
        heading: ["'Satoshi-Variable'", "system-ui", "sans-serif"],
        body: ["'Satoshi-Variable'", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#12BDFB",
          50: "#e8f9ff",
          100: "#d0f2fe",
          200: "#a6e6fd",
          300: "#6dd5fb",
          400: "#32c5f9",
          500: "#12BDFB",
          600: "#0499d4",
          700: "#077aab",
          800: "#0c658d",
          900: "#164e63",
          950: "#0a3347",
        },
        accent: {
          DEFAULT: "#fbbf84",
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fcd6a8",
          300: "#fbbf84",
          400: "#f9a654",
          500: "#f7892a",
          600: "#e8711a",
          700: "#c15a13",
          800: "#9a4817",
          900: "#7c3b16",
        },
        dark: "#0c1f2e",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
