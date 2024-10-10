import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        logoColor: "var(--logoColor)",
      },
      boxShadow: {
        'custom': '0px 0px 0px 1px rgba(18, 55, 105, 0.08)',
      },
    },
  },
  plugins: [],
};
export default config;
