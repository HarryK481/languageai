import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#c8102e", // đỏ Trung Hoa
          dark: "#9b0c23",
          light: "#fde8ea",
        },
      },
      fontFamily: {
        hanzi: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
