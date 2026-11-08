/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4fbf7',
          100: '#e6f7ef',
          500: '#10b981',
          600: '#059669',
          900: '#064e3b',
        }
      }
    },
  },
  plugins: [],
}
