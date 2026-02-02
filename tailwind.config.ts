import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        background: '#05010D',
        surface: '#0A0510',
        card: '#0F0518',
        primary: 'rgb(var(--color-primary) / <alpha-value>)', 
        primaryDark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
        primaryNeon: '#D946EF', 
        accentGreen: '#39FF14',
        accentYellow: '#FAFF00', 
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'orb-move': 'orbMove 20s infinite alternate',
        'electric-pulse': 'electricPulse 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        orbMove: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(50px, -50px) scale(1.2)' },
          '100%': { transform: 'translate(-50px, 50px) scale(1)' },
        },
        electricPulse: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.5)' },
        }
      },
      boxShadow: {
        'neon-primary': '0 0 20px rgb(var(--color-primary) / 0.5), 0 0 60px rgb(var(--color-primary) / 0.3)',
        'neon-green': '0 0 20px rgba(57, 255, 20, 0.5), 0 0 60px rgba(57, 255, 20, 0.3)',
      }
    },
  },
  plugins: [],
};
export default config;