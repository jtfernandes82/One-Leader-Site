/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        headerBlue: "#4C7CC1",
        brandGold: "#F5C24B",
        brandGoldDark: "#D4A32C",
        brandSky: "#E6EEF7",
        brandBody: "#334155",
      },
    },
  },
  plugins: [],
}
