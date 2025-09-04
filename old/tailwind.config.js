export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // Add this line
  theme: {
    extend: {
      keyframes: {
        modalPopUp: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '60%': { opacity: '1', transform: 'scale(1.05)' },
          '80%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        modalPopDown: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.5)' },
        },
      },
      animation: {
        modalPopUp: 'modalPopUp 0.35s ease-out forwards',
        modalPopDown: 'modalPopDown 0.25s ease-in forwards',
      },
    },
  },
}
