/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg1: "rgba(var(--bg1), 1)",
        hover: "rgba(var(--hover), 1)",
        text1: "rgba(var(--text1), 1)",
        icon: "rgba(var(--icon), 1)",
        border: "rgba(var(--border),1)",
      }
    },
  },
  plugins: [],
};
