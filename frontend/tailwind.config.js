/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        table: "1fr 1fr .5fr .5fr .8fr .8fr",
      },
    },
  },
  plugins: [],
};
