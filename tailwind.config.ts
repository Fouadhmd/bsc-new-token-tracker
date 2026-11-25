import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* DESIGN.md - Claude-inspired Design System */
        /* Brand & Accent */
        primary: '#cc785c',
        'primary-active': '#a9583e',
        'primary-disabled': '#e6dfd8',
        'accent-teal': '#5db8a6',
        'accent-amber': '#e8a55a',

        /* Surface - Cream Canvas Mode */
        canvas: '#faf9f5',
        'surface-soft': '#f5f0e8',
        'surface-card': '#efe9de',
        'surface-cream-strong': '#e8e0d2',

        /* Surface - Dark Navy Mode */
        'surface-dark': '#181715',
        'surface-dark-elevated': '#252320',
        'surface-dark-soft': '#1f1e1b',

        /* Borders */
        hairline: '#e6dfd8',
        'hairline-soft': '#ebe6df',

        /* Text */
        ink: '#141413',
        'body-strong': '#252523',
        body: '#3d3d3a',
        muted: '#6c6a64',
        'muted-soft': '#8e8b82',
        'on-primary': '#ffffff',
        'on-dark': '#faf9f5',
        'on-dark-soft': '#a09d96',

        /* Semantic */
        success: '#5db872',
        warning: '#d4a017',
        error: '#c64545',
      },
      fontFamily: {
        display: ['Tiempos Headline', 'Copernicus', 'Georgia', 'Times New Roman', 'serif'],
        body: ['StyreneB', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['64px', { lineHeight: '1.05', letterSpacing: '-0.023em', fontWeight: '400' }],
        'display-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.021em', fontWeight: '400' }],
        'display-md': ['36px', { lineHeight: '1.15', letterSpacing: '-0.014em', fontWeight: '400' }],
        'display-sm': ['28px', { lineHeight: '1.2', letterSpacing: '-0.011em', fontWeight: '400' }],
        'title-lg': ['22px', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '500' }],
        'title-md': ['18px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
        'title-sm': ['16px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
        'body-md': ['16px', { lineHeight: '1.55', letterSpacing: '0', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.55', letterSpacing: '0', fontWeight: '400' }],
        caption: ['13px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
        'caption-uppercase': ['12px', { lineHeight: '1.4', letterSpacing: '0.094em', fontWeight: '500' }],
        code: ['14px', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        button: ['14px', { lineHeight: '1', letterSpacing: '0', fontWeight: '500' }],
        'nav-link': ['14px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        pill: '9999px',
      },
      spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        section: '96px',
      },
      boxShadow: {
        'card-hover': '0 8px 32px rgba(20, 20, 19, 0.08)',
        'metric-hover': '0 12px 40px rgba(20, 20, 19, 0.1)',
        'primary-glow': '0 4px 20px rgba(204, 120, 92, 0.25)',
      },
      transitionDuration: {
        fast: '120ms',
        base: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'ease-spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;