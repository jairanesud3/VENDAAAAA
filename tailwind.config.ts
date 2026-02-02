import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}" // Safety catch for nested src folders
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
        accentGreen: '#39FF14',
        accentYellow: '#FAFF00', 
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'swing': 'swing 1s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        swing: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(15deg)' },
          '40%': { transform: 'rotate(-10deg)' },
          '60%': { transform: 'rotate(5deg)' },
          '80%': { transform: 'rotate(-5deg)' },
        }
      },
      boxShadow: {
        'neon-primary': '0 0 20px rgb(var(--color-primary) / 0.5), 0 0 60px rgb(var(--color-primary) / 0.3)',
      }
    },
  },
  plugins: [],
};
export default config;