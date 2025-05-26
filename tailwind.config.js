/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          'cloudm': {
            'dark-bg': '#0a0e27',
            'blue': '#4285f4',
            'orange': '#ff6b35',
            'white': '#ffffff',
            'light-gray': '#f5f7fa',
            'text-light': '#a0a9c9',
            'card-bg': '#1a1f3a',
            'border': 'rgba(255,255,255,0.1)'
          },
          'navy': {
            DEFAULT: '#032D60',
            light: '#E8EFF6',
            medium: '#D0DFF0',
            dark: '#021F43',
          },
          primary: '#032D60',
          'primary-light': '#E8EFF6',
          'primary-medium': '#D0DFF0',
          'primary-dark': '#021F43',
          secondary: '#FFFFFF',
          accent: '#4A90E2',
          success: '#28A745',
          warning: '#FFC107',
          danger: '#DC3545',
          'fee-bg': '#E1F5FE',
          'fx-bg': '#E8F5E9',
          'volume-bg': '#FFF8E1',
          'financial-bg': '#EFEBE9',
          'corridor-bg': '#EDE7F6',
          'approval-bg': '#FFEBEE',
          'summary-bg': '#F3E5F5'
        }
      },
    },
    plugins: [
      require('./tailwind-plugin.js')
    ],
  }
  