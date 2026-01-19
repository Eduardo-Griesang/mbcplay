import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBackground: "#191919",
        secondaryBackground: "#212121",
        foreground: "var(--foreground)",
        white: "#FFFFFF",
        mainText: "#E8E8E8",
        secondaryText: "rgba(232, 232, 232, 0.35)",
        thirdText: "#888888",
        fourthText: "#666666",
        fifthText: "#6C6C6C"
      },
      borderRadius: {
        "4xl": "30px",
      },
      borderWidth: {
        1: "1px"
      }
    },
  },
  plugins: [],
};
export default config;
