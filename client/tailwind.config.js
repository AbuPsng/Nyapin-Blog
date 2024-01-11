/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        twentySix: "24%",
        thirty: "30%"
      }
    },
  },
  plugins: [],
}

