import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fDark: "#292524",
        fOrange: "#f8b26a",
        fRed: "#e15b64",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      dropShadow: {
        base: "0px 0px 10px -3px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
