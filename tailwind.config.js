module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandWhite: "#DCD7C9",
        darkPrimary: "#2C3638",
        primary: "#3F4E4F",
        brandBrown: "#A27B5C",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
