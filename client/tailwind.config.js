module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat'],
      },
      colors: {
        'light-black': '#27282C',
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
    },
  },
  variants: {
    visibility: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
};
