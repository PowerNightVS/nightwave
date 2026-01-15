
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#050505',
          dark: '#0a0a0f',
          gray: '#1a1a2e',
          cyan: '#00f0ff',
          purple: '#b026ff',
          pink: '#ff006e',
        }
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00f0ff, 0 0 10px #00f0ff, 0 0 20px #00f0ff',
        'neon-purple': '0 0 5px #b026ff, 0 0 10px #b026ff, 0 0 20px #b026ff',
        'neon-pink': '0 0 5px #ff006e, 0 0 10px #ff006e, 0 0 20px #ff006e',
        'neon-cyan-intense': '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #00f0ff, 0 0 80px #00f0ff',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1a1a2e 1px, transparent 1px), linear-gradient(to bottom, #1a1a2e 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
