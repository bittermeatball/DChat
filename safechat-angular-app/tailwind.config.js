const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    important: true,
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#673ab7',
            '50': '#f7f5fb', 
            '100': '#f0ebf8', 
            '200': '#d9ceed', 
            '300': '#c2b0e2', 
            '400': '#9575cd', 
            '500': '#673ab7', 
            '600': '#5d34a5', 
            '700': '#4d2c89', 
            '800': '#3e236e', 
            '900': '#321c5a'
          },
          accent: {
            DEFAULT: '#ffd740',
            '50': '#fffdf5', 
            '100': '#fffbec', 
            '200': '#fff5cf', 
            '300': '#ffefb3', 
            '400': '#ffe379', 
            '500': '#ffd740', 
            '600': '#e6c23a', 
            '700': '#bfa130', 
            '800': '#998126', 
            '900': '#7d691f'
          },
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};
