/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        theme: "rgb(240, 155, 10)",
        "theme-text": "rgb(0, 60, 70)",
        "dark-red": "rgb(170, 50, 47)",
      },
    },
  },
  plugins: [],
};
