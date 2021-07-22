module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat'],
        heading: ['Libre Baskerville'],
      },
      colors: {
        'light-black': '#27282C',
        'hero-blend': '#FEFEFE',
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
        108: '27rem',
      },
      boxShadow: {
        orange: '0 4px 14px 0 rgba(237, 137, 54, 0.39)',
      },
      backgroundImage: (theme) => ({
        'hero-image': "url('/couple_drinking.webp')",
      }),
    },
  },
  variants: {
    extend: {
      visibility: ['responsive', 'hover', 'focus'],
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
