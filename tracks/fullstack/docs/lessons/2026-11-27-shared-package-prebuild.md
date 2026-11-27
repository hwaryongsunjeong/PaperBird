# 공유 패키지(dist)를 먼저 빌드하지 않으면 앱이 새 clone에서 실패한다

- 날짜 / 관련 이슈·PR: 2026-11-27 / #10 (GPT 리뷰 1라운드 High 지적)
- 증상: `packages/schemas/dist`가 없는 상태(새 clone, `pnpm install` 직후)에서 `apps/web`의 `typecheck`(exit 2)·`build`(exit 1)·`dev` 첫 페이지가 `@paperbird/schemas`를 해석하지 못함
- 원인: 공유 패키지의 `exports`·`types`가 빌드 산출물 `dist/`를 가리키는데, 앱 스크립트가 공유 패키지 빌드를 먼저 돌리지 않았음. 로컬에서는 #9 작업 때 만든 `dist/`가 남아 있어 드러나지 않았음
- 수정: `apps/web`에 `deps:build`(`pnpm --filter @paperbird/schemas build`)를 두고 `dev`·`build`·`typecheck`가 먼저 실행하게 함
- 예방: 공유 패키지를 쓰는 앱(`apps/api` 포함)은 같은 방식으로 `deps:build`를 앞에 붙인다. 검사는 `dist/`를 지운 상태에서도 한 번 돌려 본다
- 방어 수준: L2 — 앱 스크립트 자체가 선행 빌드를 수행 (L3로 올리려면 CI에서 깨끗한 clone으로 검사)

## 재발 — 2026-11-27 #11 (GPT 리뷰 1라운드 High·Medium)
- 상황: `apps/api`에 교훈대로 `deps:build`를 `dev`·`build`·`typecheck`에만 붙이고 `test`·`start`에는 빠뜨림. api 테스트는 스키마 **값**을 실행해서(web 테스트는 타입만 import) `dist` 없이 실패했고, `start`도 모듈을 찾지 못함
- 원인: 교훈의 예방 문구가 "dev·build·typecheck"로 스크립트를 나열해서, 나열되지 않은 스크립트를 놓침
- 수정: `apps/api`의 `start`·`test`·`test:watch`에도 `deps:build` 추가
- 예방(갱신): 공유 패키지를 쓰는 앱은 **공유 패키지를 불러오는 모든 실행 스크립트**(dev·build·start·typecheck·test·test:watch)에 `deps:build`를 붙인다. 검사는 `packages/*/dist`를 지운 뒤 스크립트마다 돌린다
- 방어 수준: L2 → **L3 제안** — 재발했으므로 자동 검사로 올린다. 제안: 루트에 `packages/*/dist`를 지운 뒤 전체 검사를 돌리는 스크립트(예: `check:clean`)를 두고 `/finish`가 실행. 루트 `package.json`은 `harness` 경로라 후보 티켓으로 분리
