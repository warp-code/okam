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
        "25": "100px",
        "45": "180px",
        "51": "204px",
        "58": "232px",
        "88": "352px",
        "98": "392px",
        "131": "524px",
        "115": "460px",
        "270": "1080px",
      },
      lineHeight: {
        "11": "2.75rem"
      },
      colors: {
        current: "currentColor",
        gray: {
          '25': '#FAFAFA',
          '50': '#F5F5F6',
          '100': '#F0F1F1',
          '200': '#ECECED',
          '300': '#CECFD2',
          '400': '#94969C',
          '500': '#85888E',
          '600': '#61646C',
          '700': '#333741',
          '800': '#1F242F',
          '900': '#161B26',
          '950': '#0C111D'
        },
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
        "okam-black": "#191919",
        "okam-dark-green": "#1C2120"
      }
    },
  },
  plugins: [],
};
export default config;
