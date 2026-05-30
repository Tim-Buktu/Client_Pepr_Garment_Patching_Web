/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current:     'currentColor',
      black:  '#0a0a0a',
      white:  '#fafafa',
      gray: {
        50:  '#f5f5f5',
        100: '#ebebeb',
        200: '#d6d6d6',
        300: '#b8b8b8',
        400: '#969696',
        500: '#737373',
        600: '#545454',
        700: '#363636',
        800: '#1f1f1f',
        900: '#141414',
      },
    },
    fontFamily: {
      display: ['var(--font-display)', 'Georgia', 'serif'],
      body:    ['var(--font-body)', '-apple-system', 'sans-serif'],
      mono:    ['var(--font-mono)', 'monospace'],
      sans:    ['var(--font-body)', '-apple-system', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      borderRadius: {
        sharp: 'var(--radius-sharp)',
        soft:  'var(--radius-soft)',
        pill:  'var(--radius-pill)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
