module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        // FOR DARKMODE
        darkGray: "#101927",
        darkCard: "#192230",
        darkInput: "#1F283B",
        // light mode
        lightYellow: "#F4F5F4",
        yellowNav: "#F5ECE4",
      },
      textColor: {
        // darkmode
        textGray: "#A1AFC1",
        // light mode
        textLight: "#697280",
      },
    },
  },
  plugins: [],
};
