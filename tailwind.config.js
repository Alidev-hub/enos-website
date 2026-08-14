/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        enos: {
          50: '#f2f7ff',
          100: '#e5efff',
          500: '#1768e5',
          600: '#0c50bf',
          900: '#08275c',
          950: '#051a3d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
