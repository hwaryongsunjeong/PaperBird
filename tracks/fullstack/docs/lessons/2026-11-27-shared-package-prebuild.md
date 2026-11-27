# 공유 패키지(dist)를 먼저 빌드하지 않으면 앱이 새 clone에서 실패한다

- 날짜 / 관련 이슈·PR: 2026-11-27 / #10 (GPT 리뷰 1라운드 High 지적)
- 증상: `packages/schemas/dist`가 없는 상태(새 clone, `pnpm install` 직후)에서 `apps/web`의 `typecheck`(exit 2)·`build`(exit 1)·`dev` 첫 페이지가 `@paperbird/schemas`를 해석하지 못함
- 원인: 공유 패키지의 `exports`·`types`가 빌드 산출물 `dist/`를 가리키는데, 앱 스크립트가 공유 패키지 빌드를 먼저 돌리지 않았음. 로컬에서는 #9 작업 때 만든 `dist/`가 남아 있어 드러나지 않았음
- 수정: `apps/web`에 `deps:build`(`pnpm --filter @paperbird/schemas build`)를 두고 `dev`·`build`·`typecheck`가 먼저 실행하게 함
- 예방: 공유 패키지를 쓰는 앱(`apps/api` 포함)은 같은 방식으로 `deps:build`를 앞에 붙인다. 검사는 `dist/`를 지운 상태에서도 한 번 돌려 본다
- 방어 수준: L2 — 앱 스크립트 자체가 선행 빌드를 수행 (L3로 올리려면 CI에서 깨끗한 clone으로 검사)
