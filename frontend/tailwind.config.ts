import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customBlue: '#6199FF',
        deepBlue: '#014DBB',
        customGreen: '#D6E584',
        customRed: '#ffb4a1',
        customBrown: '#a35946',
      },
    },
  },
  plugins: [],
} satisfies Config;
