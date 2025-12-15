/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef6f3',
          100: '#d7ebe3',
          200: '#b0d7c7',
          300: '#86c2aa',
          400: '#5eaa8f',
          500: '#3f8f75',
          600: '#2f725e',
          700: '#255a4b',
          800: '#1d4439',
          900: '#16352c',
        },
        accent: '#cd4a6c',
        surface: '#ffffff',
        muted: '#64748b',
        divider: '#e5e7eb',
      },

      boxShadow: {
        soft: '0 2px 10px rgba(0,0,0,0.06)',
        softLg: '0 8px 30px rgba(0,0,0,0.08)',
        card: '0 6px 18px rgba(0,0,0,0.08)',
        hover: '0 12px 32px rgba(0,0,0,0.12)',
      },

      spacing: {
        section: '5rem',
        card: '1.25rem',
      },

      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },

      fontFamily: {
        display: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
        ],
      },
    },
  },
  plugins: [],
};
