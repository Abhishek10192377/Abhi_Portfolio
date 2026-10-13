export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        stark: {
          void: '#05060a',
          night: '#0a0c11',
          charcoal: '#12151c',
          steel: '#1b1f29',
          red: '#e11d2e',
          crimson: '#9b111e',
          gold: '#d4a437',
          amber: '#f5cf6b',
          cyan: '#5ee6ff',
          silver: '#c9ced8',
          muted: '#8b92a0',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'Rajdhani', 'system-ui', 'sans-serif'],
        body: ['Rajdhani', 'system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-red': '0 0 28px -6px rgba(225, 29, 46, 0.55)',
        'glow-gold': '0 0 28px -8px rgba(212, 164, 55, 0.5)',
        'glow-cyan': '0 0 24px -6px rgba(94, 230, 255, 0.45)',
      },
    },
  },
  plugins: [],
}
