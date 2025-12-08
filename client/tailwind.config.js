/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: "#153f35",    // deep green used in footer / headings
        accent: "#d85957",        // coral button color
        lightAccent: "#f3c8c6",
        cardBg: "#ffffff",
        verified: "#38d39f",primary: {
          50: "#eef6ff",
          100: "#dff0ff",
          200: "#bfe3ff",
          300: "#9fd6ff",
          400: "#5fbfff",
          500: "#0B61FF", // primary 500 (used in docs)
          600: "#094ed6",
          700: "#073aa0",
          800: "#052a78",
          900: "#031a4b"
        }
      },
      boxShadow: {
        'soft-lg': '0 20px 30px rgba(19, 63, 53, 0.06)',
        'card': '0 8px 20px rgba(2,6,23,0.08)'
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      borderRadius: {
        'lg-xl': '14px'
      }
    },
  },
  plugins: [],
}
