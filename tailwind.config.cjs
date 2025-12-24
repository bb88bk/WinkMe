/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'dash-bg': '#050509',
        'dash-surface': '#15161c',
        'dash-surface-soft': '#1b1d25',
        'dash-border': '#2a2d38',
        'dash-muted': '#9a9fb5',
        'dash-text': '#f5f5ff',
        'dash-accent': '#2e7dfb',
        'dash-accent-soft': '#3e8aff',
        'dash-danger': '#ff4b6e',
        'dash-success': '#22c55e',
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(46, 125, 251, 0.55)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
