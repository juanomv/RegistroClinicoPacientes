module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        green:{
          primary:'#30A414'
        },
        blue:{
          primary:"#073651"
        }
      }
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
