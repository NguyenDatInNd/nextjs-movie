/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "bp-375": "375px",
      "bp-425": "425px",
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1600px",
      "3xl": "1700px",
      "4xl": "1800px",
    },
    extend: {
      colors: {
        primary100: "var(--primary-100)",
        primary200: "var(--primary-200)",
        primary300: "var(--primary-300)",
        primary400: "var(--primary-400)",
        primary500: "var(--primary-500)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        neutral_100: "var(--neutral--100)",
        neutral100: "var(--neutral-100)",
        neutral200: "var(--neutral-200)",
        neutral300: "var(--neutral-300)",
        neutral400: "var(--neutral-400)",
        neutral500: "var(--neutral-500)",
        neutral600: "var(--neutral-600)",
        neutral700: "var(--neutral-700)",
        text_link: "var(--text-link)",
        highEmphasis: "var(--high-emphasis)",
        mediumEmphasis: "var(--medium-emphasis)",
        disabled: "var(--disabled)",
        backgroundColor: "var(--background-color)",
      },
    },
  },
  plugins: [],
};
