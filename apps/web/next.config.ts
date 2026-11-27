import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

// .css.ts(vanilla-extract) 파일을 빌드 시점에 CSS로 바꾼다.
// Next 16은 Turbopack이 기본이라 Turbopack 규칙도 켠다 (플러그인 옵션명이 아직 unstable_).
const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'auto' },
});

const nextConfig: NextConfig = {
  // 워크스페이스 패키지(@paperbird/schemas)를 Next가 함께 처리한다
  transpilePackages: ['@paperbird/schemas'],
};

export default withVanillaExtract(nextConfig);
