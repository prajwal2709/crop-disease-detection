/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          bg: '#F4FAF5',
        },
        primary: {
          DEFAULT: '#2E7D32',
          dark: '#1B5E20',
          light: '#4CAF50',
        },
        secondary: {
          DEFAULT: '#E8F5E9',
          dark: '#C8E6C9',
        },
        disease: {
          DEFAULT: '#C62828',
          light: '#EF5350',
        },
        healthy: '#1B5E20',
      },
      fontFamily: {
        display: ['Poppins', 'Noto Sans Devanagari', 'sans-serif'],
        body: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
