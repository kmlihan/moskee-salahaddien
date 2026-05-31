/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'Scheherazade New', 'serif'],
      },
      colors: {
        ink: '#1a1410',
        paper: '#faf6ec',
        cream: '#f4ecd8',
        'cream-dark': '#e8dec4',
        wine: '#6b1820',
        'wine-deep': '#4a0f15',
        brass: '#b8924d',
        'brass-light': '#d4b478',
        stone: '#8a7e6e',
      },
    },
  },
  plugins: [],
};
