/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1B3A57",  // Dark Blue
        green: "#3A78B7",   // Blue
        green_100: "#E5F0FA", // Light Blue
        gray_100: "#4A5568", // Muted Gray-Blue
        text: "#1A1A1A",     // Deep Gray for readability
      },

      // colors: {
      //   primary: "#204C41",
      //   green: "#5BBB7B",
      //   green_100: "#EEF8F2",
      //   gray_100: "#6C7278",
      //   text: "#222222",
      // }, //for green theme 

      boxShadow: {
        s1: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
        s2: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        s3: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      },
    },
  },
  plugins: [],
};