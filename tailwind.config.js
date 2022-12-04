/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontFamily: {
        lato: ['Lato', 'Helvetica', 'Verdana', 'Tahoma', 'sans-serif'],
        'lato-italic': [
          'Lato Italic',
          'Helvetica',
          'Verdana',
          'Tahoma',
          'sans-serif',
        ],
        'lato-bold': [
          'Lato Bold',
          'Helvetica',
          'Verdana',
          'Tahoma',
          'sans-serif',
        ],
        'lato-bold-italic': [
          'Lato Bold Italic',
          'Helvetica',
          'Verdana',
          'Tahoma',
          'sans-serif',
        ],
        'lato-heavy': [
          'Lato Heavy',
          'Helvetica',
          'Verdana',
          'Tahoma',
          'sans-serif',
        ],
        'lato-heavy-italic': [
          'Lato Heavy Italic',
          'Helvetica',
          'Verdana',
          'Tahoma',
          'sans-serif',
        ],
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')],
};
