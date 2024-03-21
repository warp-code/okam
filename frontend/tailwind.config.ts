import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        "18": "72px",
      },
      colors: {
        current: "currentColor",
        green: {
          '25': '#F6FEFC',
          '50': '#F0FDF9',
          '100': '#CCFBEF',
          '200': '#99F6E0',
          '300': '#5FE9D0',
          '400': '#2ED3B7',
          '500': '#15B79E',
          '600': '#0E9384',
          '700': '#107569',
          '800': '#125D56',
          '900': '#134E48',
          '950': '#0A2926'
        },
      }
    },
  },
  plugins: [],
};
export default config;
