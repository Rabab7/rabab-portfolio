/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
  content:{
    relative: true,
    transform: (content) => content.replace(/taos:/g, ''),
    files:["./src/**/*.js", "./*.html"],
  } ,
  theme: {
    extend: {
      colors: {
        bgColor: '#191f36',
        sndBgColor: '#262840',
        mainColor: '#59B2F4',
      },

      boxShadow: {
        'custom-shadow': '0 0 1rem #59B2F4',
        

    },

      animation:{
        type:"type 5s steps(20, end) infinite ",
        floatImage: "floatImage 4s ease-in-out infinite"
      },

      keyframes: {
        type: {
          '0%': { content: "'F'" },
          '10%': { content: "'Fr'" },
          '20%': { content: "'Fro'" },
          '30%': { content: "'Fron'" },
          '40%': { content: "'Front'" },
          '50%': { content: "'Frontend'" },
          '60%': { content: "'Frontend D'" },
          '70%': { content: "'Frontend Dev'" },
          '80%': { content: "'Frontend  Developer'" },
          // '90%': { content: "'Frontend Angular '" },
          // '100%': { content: "'Frontend Angular '" },
        },

        floatImage: {
          '0%': { transform: "translateY(0)" },
          '50%': { transform: "translateY(-2.4rem)" },
          '100%': { transform: "translateY(0)" }
      }
      },


    },
  },
  plugins: [
    require('daisyui' , 'taos/plugin' ),
  ],
  safelist: [
    '!duration-[0ms]',
    '!delay-[0ms]',
    'html.js :where([class*="taos:"]:not(.taos-init))'
  ]
}

