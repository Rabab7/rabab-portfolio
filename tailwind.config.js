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
          '0%': { content: "'A'" },
          '10%': { content: "'Ang'" },
          '20%': { content: "'Angul'" },
          '30%': { content: "'Angular '" },
          '40%': { content: "'Angular Front'" },
          '55%': { content: "'Angular Frontend '" },
          '70%': { content: "'Angular Frontend Dev'" },
          '85%, 100%': { content: "'Angular Frontend Developer'" },
        },
        

        floatImage: {
          '0%': { transform: "translateY(0)" },
          '50%': { transform: "translateY(-2.4rem)" },
          '100%': { transform: "translateY(0)" }
      }
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
}
