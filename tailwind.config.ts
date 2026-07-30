import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#2F2F2F',
        secondary: '#525150',
        primary: '#AD2F28',
        bg: '#F8F8F8',
        line: '#E9E9E9'
      },
      fontFamily: {
        cairo: ['var(--font-cairo)', 'sans-serif'],
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif']
      },
      borderRadius: {
        card: '18px'
      }
    }
  },
  plugins: []
};

export default config;
