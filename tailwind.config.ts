import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fdf7ee",
        navy: "#1a1f3c",
      },
      fontFamily: {
        serif: ["Lora", "Georgia", "serif"],
        sans:  ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
