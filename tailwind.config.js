/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Nền vũ trụ (deep cosmos)
        cosmos: {
          950: '#05060d',
          900: '#080b16',
          800: '#0d1120',
          700: '#141a2d',
          600: '#1d2540',
          500: '#2a3457',
        },
        // Dương = vàng kim
        gold: {
          DEFAULT: '#e8c373',
          soft: '#f4dda8',
          deep: '#c79a45',
        },
        // Âm = ngọc lục
        jade: {
          DEFAULT: '#5fb89a',
          soft: '#92d8bf',
          deep: '#3c8e76',
        },
        // Chữ / mực
        ink: {
          DEFAULT: '#ece8dd',
          muted: '#9aa1b6',
          faint: '#5d6480',
        },
        cinnabar: '#d9603b',
        // Minh triết Lão–Trang = mực-bạc/nguyệt (thủy mặc, "nhược thủy").
        // Tách bạch khỏi gold(Dương)/jade(Âm)/cinnabar(Tương Khắc·hào động).
        silk: {
          DEFAULT: '#b9c2d6',
          soft: '#d8def0',
          deep: '#8a93ad',
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Noto Serif"', 'Georgia', 'serif'],
        han: ['"Noto Serif SC"', '"Noto Serif"', 'serif'],
      },
      maxWidth: {
        prose: '68ch',
        content: '1240px',
        wide: '1600px',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        gold: '0 0 18px -2px rgba(232, 195, 115, 0.55)',
        jade: '0 0 18px -2px rgba(95, 184, 154, 0.45)',
        // Bóng nhuốm sắc nền (xanh cosmos) thay vì đen thuần — chiều sâu tinh tế.
        panel: '0 10px 44px -16px rgba(3, 6, 16, 0.85)',
        'panel-raised':
          '0 24px 70px -28px rgba(3, 6, 16, 0.95), 0 2px 0 0 rgba(255,255,255,0.04) inset',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '1' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        // "Thở" rất khẽ — biên độ nhỏ, chỉ cho điểm nhấn trang trí (glow/hào).
        breathe: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.015)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        twinkle: 'twinkle 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 90s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        breathe: 'breathe 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
