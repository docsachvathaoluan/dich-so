/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  // Site chạy ở https://docsachvathaoluan.github.io/dich-so/ — mọi asset phải trỏ
  // vào /dich-so/. Đặt luôn cho cả dev (dev server tự chuyển / → /dich-so/) để lỗi
  // subpath lộ ra khi đang làm, thay vì sau khi đã deploy.
  base: '/dich-so/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
  },
});
