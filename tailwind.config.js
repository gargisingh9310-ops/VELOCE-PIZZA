/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F6F0E5',
          light: '#FAF7F2',
          dark: '#EDE5D8',
        },
        ivory: {
          DEFAULT: '#FBF8F2',
          soft: '#F4EFE6',
        },
        paper: {
          DEFAULT: '#FFFDF9',
          warm: '#FDFBF7',
        },
        terracotta: {
          DEFAULT: '#B9573F',
          light: '#CD6A52',
          dark: '#9A412C',
        },
        clay: {
          DEFAULT: '#914332',
          dark: '#783526',
        },
        wood: {
          DEFAULT: '#7A523A',
          dark: '#5C3C28',
          light: '#966B50',
        },
        olive: {
          DEFAULT: '#66705A',
          light: '#7B876E',
          dark: '#4F5844',
        },
        charcoal: {
          DEFAULT: '#25231F',
          muted: '#3C3933',
          light: '#524E47',
          soft: '#6E6960',
        },
        taupe: {
          DEFAULT: '#8C8378',
          light: '#A89F94',
          dark: '#70685E',
        },
      },
      fontFamily: {
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        serif: ['Italiana', 'Cinzel', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.02em',
        widest: '0.2em',
        ultra: '0.3em',
      },
      boxShadow: {
        'warm-sm': '0 4px 20px rgba(60, 42, 30, 0.05)',
        'warm': '0 12px 35px rgba(60, 42, 30, 0.08)',
        'warm-lg': '0 20px 50px rgba(60, 42, 30, 0.12)',
        'warm-xl': '0 25px 70px rgba(60, 42, 30, 0.16)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
