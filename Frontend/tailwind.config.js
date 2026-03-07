/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#34d399', // emerald-400
          DEFAULT: '#10b981', // emerald-500
          dark: '#059669', // emerald-600
        },
        navy: {
          light: '#1e293b', // slate-800
          DEFAULT: '#0f172a', // slate-900
          dark: '#020617', // slate-950
        },
        accent: '#f8fafc', // slate-50
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
