import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // .css.ts 파일을 테스트에서도 처리한다
  plugins: [vanillaExtractPlugin()],
  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname },
  },
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
