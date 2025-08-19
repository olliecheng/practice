/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Fira Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'serif': ["Bricolage Grotesque Variable", "sans-serif"]
      },
      colors: {
        'beige': {
          50: '#fefdfb',
          100: '#fdf8f0',
          200: '#faf0dc',
          300: '#f5e6c8',
          400: '#f0dcb4',
          500: '#f5f5dc', // Main beige color
          600: '#e8d5a3',
          700: '#dbc58e',
          800: '#ceb579',
          900: '#c1a564',
        },
        'gradient': {
          'coral': '#FFB5A7',
          'peach': '#FCD5CE',
          'lavender': '#E8B4F5',
          'cream': '#FFF3B0',
          'soft-beige': '#F5F5DC',
        }
      },
      backgroundColor: {
        'primary': '#f5f5dc',
      }
    },
  },
  plugins: [],
}