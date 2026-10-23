/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          lime: '#C6FF35',
          muted: '#A5D625',
        },
        dark: {
          bg: '#0B0F14',
          deep: '#06090D',
          surface: '#0E1318',
          border: '#2B333A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"Space Mono"', 'monospace'],
        tech: ['"Space Grotesk"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
