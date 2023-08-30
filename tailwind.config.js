
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: "Poppins",
      },
      screens: {
        "md/lg": {min: "900px"}
      }
    },
  },
  plugins: [],
}

