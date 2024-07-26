/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  'node_modules/flowbite-react/lib/esm/**/*.js'
],
  
  theme: {
    extend: {
      colors:{
        'yellow': '#F2C300',
        'orange': 'rgb(225, 66, 26)',
        'lightblue': 'rgb(81, 222, 232)',
        'blue-btn': '#4E43FA',
        'dark-blue':'#1004B8',
        'user-color': '#8D8D8D',
        'nav-text':'#101828',
        'menu-circle': '#EC5134',
        'nav-color': '#2E2F32',
        'grey': '#808080',
        'gradient1': '#F0B400',
        'gradient2':'#E76C02',
        'gradient3':'#7AD0BD', 
        'gradient4': '#EF5277F9',
        'gradient5':'#F58244F9',
        'gradient6':'#45DAE3',
        'gradient7': '#F0BD00',
        'gradient8': '#F00F2B',
        'dark':'RGBA(17, 24, 43, var(--bs-bg-opacity, 1))',
        'linear-gradient1': "#7973FF", 
        'linear-gradient2': "#D7DAFF",
        'input-clr': 'rgba(78, 67, 250, 0.10)',
        'footer-bg': '#1F2937',
        'blur-bg': 'rgba(124, 123, 123, 0.9)',
        'popup_bg':'rgba(0,0,0,0.6)',
      },
    },
    fontFamily:{
      Manrope:['Manrope', 'sans-serif'],
      Roboto:['Roboto', 'sans-serif'],
      Inter: ["Inter", 'sans-serif'],
      Poppins: ["Poppins", 'sans-serif'],
      Mulish: ["Mulish", 'sans-serif'],
      DMSans: ["DM+Sans", 'sans-serif']
    },
  },
 
  plugins: [],
}

