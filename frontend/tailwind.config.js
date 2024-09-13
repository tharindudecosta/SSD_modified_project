/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: "'Lato', sans-serif",
      },
      colors: {
        "navbar-background": "rgba(255, 249, 248, 0.7)",
        "navbar-background-dark": "rgba(17, 24, 39,0.6)",
        "custom-gray": "#E8E8E8",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
