/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['var(--font-poppins)', 'sans-serif'],
        'sans': ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Updated Color Palette
        primary: {
          DEFAULT: '#39ace7',
          light: '#9bd4e4',
          lighter: '#cadeef',
          dark: '#0784b5',
        },
        secondary: {
          DEFAULT: '#ffffff',
          light: '#cadeef',
        },
        accent: {
          DEFAULT: '#9bd4e4',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}