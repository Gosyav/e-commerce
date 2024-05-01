import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        'color-one': '#F5F7FF',
        'color-two': '',
        'color-three': '#0156FF',
        'color-four': '#01A4FF',
        'color-five': '#A2A6B0',
        'color-six': '#CACDD8',
        'color-seven': '#000000',
        'color-eight': '#C94D3F',
        'color-nine': '#78A962',
        'color-ten': '#666666',
      },
    },
  },
  plugins: [],
} satisfies Config;
