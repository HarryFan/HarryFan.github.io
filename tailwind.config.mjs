/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'mako-green': '#10B981',
        'aether-cyan': '#22D3EE',
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite',
        'glitch': 'glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite',
        'glitch-once': 'glitch 1s cubic-bezier(.25,.46,.45,.94) both',
        'chrome': 'chrome 5s linear infinite',
        'rec-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6', filter: 'brightness(1.5) blur(2px)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        chrome: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      backgroundImage: {
        'chrome-gradient': 'linear-gradient(90deg, #888 0%, #fff 25%, #888 50%, #fff 75%, #888 100%)',
        'mako-gradient': 'linear-gradient(90deg, #10B981 0%, #22D3EE 50%, #10B981 100%)',
      },
      boxShadow: {
        'glow-red': '0 0 15px rgba(255, 0, 0, 0.5)',
        'glow-cyan': '0 0 15px rgba(0, 240, 255, 0.5)',
        'glow-mako': '0 0 20px rgba(16, 185, 129, 0.6)',
      }
    },
  },
  plugins: [
    typography,
  ],
}
