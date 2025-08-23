/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        circle: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.5' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        dot: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        outline: {
          '0%': { transform: 'scale(0)', outline: 'solid 20px #d1d5db', outlineOffset: '0', opacity: '1' },
          '100%': { transform: 'scale(1)', outline: 'solid 0 transparent', outlineOffset: '20px', opacity: '0' },
        },
      },
      animation: {
        circle: 'circle 2s ease-in-out infinite',
        dot: 'dot 2s ease-in-out infinite',
        outline: 'outline 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};