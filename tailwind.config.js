/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        elderly: {
          blue: '#1E40AF', // Deep readable blue
          lightBlue: '#EFF6FF',
          navy: '#0F172A',
          amber: '#D97706',
          green: '#15803D',
          red: '#B91C1C',
          softGray: '#F8FAFC',
          border: '#CBD5E1'
        },
        contrast: {
          bg: '#000000',
          card: '#121212',
          text: '#FFFFFF',
          yellow: '#FFFF00',
          border: '#FFFFFF',
          hover: '#FFE600'
        }
      },
      fontSize: {
        'elderly-sm': ['1.125rem', { lineHeight: '1.75rem' }],
        'elderly-base': ['1.25rem', { lineHeight: '1.85rem' }],
        'elderly-lg': ['1.5rem', { lineHeight: '2rem' }],
        'elderly-xl': ['1.875rem', { lineHeight: '2.35rem' }],
        'elderly-2xl': ['2.25rem', { lineHeight: '2.75rem' }],
        'elderly-3xl': ['3rem', { lineHeight: '1' }],
      }
    },
  },
  plugins: [],
}
