/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f4f7fb',
          100: '#e8eef8',
          200: '#cad8ee',
          300: '#9db8df',
          400: '#6b91cb',
          500: '#476fb3',
          600: '#355795',
          700: '#2d4779',
          800: '#283d63',
          900: '#1c2844',
        },
        blush: {
          50: '#fff5f8',
          100: '#ffe9f0',
          200: '#ffd2e1',
          300: '#ffafcc',
          400: '#f283b5',
          500: '#e35f9a',
          600: '#c9447f',
          700: '#a53467',
          800: '#882e57',
          900: '#6f2949',
        },
        plum: '#2b1d2e',
        charcoal: '#1c1f26',
        gold: {
          50: '#fcf8ec',
          100: '#f7edd1',
          200: '#efd79f',
          300: '#e4bd6e',
          400: '#d8a44d',
          500: '#c98a2f',
          600: '#a96d24',
          700: '#85521e',
          800: '#6f451f',
          900: '#5f3c1f',
        },
      },
      fontFamily: {
        serifDisplay: ['"Playfair Display"', 'serif'],
        sansBody: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 14px 34px -18px rgba(76, 32, 63, 0.35)',
        lift: '0 20px 38px -16px rgba(58, 22, 49, 0.38)',
        glow: '0 0 0 4px rgba(227, 95, 154, 0.24)',
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(circle at 18% 22%, rgba(255, 189, 216, 0.24), transparent 34%), radial-gradient(circle at 78% 12%, rgba(216, 164, 77, 0.26), transparent 42%), linear-gradient(135deg, #2b1d2e 0%, #4b2740 55%, #7a335f 100%)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        subtlePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 700ms ease forwards',
        'subtle-pulse': 'subtlePulse 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

