import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        warning: '#f59e0b',
        danger: '#ef4444',
        success: '#22c55e',
      },
    },
  },
  plugins: [],
};

export default config;