/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space: '#050816',
        'space-light': '#0a1128',
        glow: '#00E5FF',
        blue: {
          hud: '#2563EB',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0,229,255,0.55), 0 0 60px rgba(37,99,235,0.35)',
        'glow-sm': '0 0 10px rgba(0,229,255,0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.55, filter: 'blur(18px)' },
          '50%': { opacity: 1, filter: 'blur(28px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '92%': { opacity: 1 },
          '93%': { opacity: 0.4 },
          '94%': { opacity: 1 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-reverse': 'spin-reverse 14s linear infinite',
        pulseGlow: 'pulseGlow 3.5s ease-in-out infinite',
        scanline: 'scanline 3s linear infinite',
        flicker: 'flicker 6s linear infinite',
      },
    },
  },
  plugins: [],
}
