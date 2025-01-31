/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "rubik": ["Rubik", "sans-serif"],
        "poppins": ["Poppins", "sans-serif"]
      },
      colors: {
        "myBlack" : {
          100 : "#180202",
          200 : "#898989"
        },
        "icon_black" : "#131313",
        "myWhite" : {
          100 : "#F7f7f7",
          200 : "#EAEAEA"
        },
        "dots_grey" : "#858585",
        "text_grey" : {
          100 : "#9ca3af",
          200 : "#ececec"
        },
        "myOrange":{
          100 : "#e85444",
          200 : "#fa6544",
          300 : "#d12600"
        },
        "log_bg" : "hsl(0, 100%, 74%)",
        "form_text" : "rgb(72, 72, 72)"
      }
    },
  },
  plugins: [],
}