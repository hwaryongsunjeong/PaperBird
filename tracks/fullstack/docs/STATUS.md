# fullstack STATUS

## 현재 상태

- pnpm 워크스페이스 준비 완료 (#8)
- `packages/schemas` (`@paperbird/schemas`) — zod 공유 패키지, 예시 `healthResponseSchema`, 검사 스크립트 6개 (#9)
- `apps/web` (`@paperbird/web`) — Next.js 16.4.6 App Router, vanilla-extract(테마 토큰 `src/styles/theme.css.ts`), TanStack Query Provider, 예시 `HealthBadge`, 검사 스크립트 6개 (#10)
  - vanilla-extract Turbopack 지원은 플러그인 옵션 `unstable_turbopack: { mode: 'auto' }`로 켬 — 옵션명이 unstable이라 플러그인 업데이트 시 확인 필요

## 다음 작업

- #11 apps/api NestJS 초기 세팅 (`GET /health`에 `@paperbird/schemas` 사용)
- #12 REA로 Confluence 스타일 문서 기능 제작 — #10·#11 이후, `/unleash`
