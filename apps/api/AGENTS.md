# AGENTS.md — apps/api

저장소 공통 규칙은 루트 `CLAUDE.md`, `docs/SPEC.md`, `docs/BOUNDARIES.md`를 따른다. 이 파일은 NestJS 기술 정보만 담는다.

- NestJS 12. 문서: https://docs.nestjs.com/llms.txt
- 패키지와 이 프로젝트는 ESM이다. 상대 import는 `.js`로 끝나고, `__dirname` 대신 `import.meta.dirname`을 쓴다.
- 테스트는 Vitest다. mock은 `vi.fn()`이다. 단위 테스트는 코드 옆 `*.spec.ts`.
- `src/main.ts`가 앱을 만들고 `PORT`(기본 3000)에서 연다. `src/app.module.ts`가 루트 모듈이다.
- 요청 검증은 공유 zod 스키마(`@paperbird/schemas`)를 쓴다. Nest의 Standard Schema 지원(`StandardSchemaValidationPipe`)으로 zod 스키마를 바로 쓸 수 있다.
- 새 라이브러리(Nest 공식 패키지 포함)는 `docs/SPEC.md`에 없으면 추가하기 전에 ADR과 팀장 승인을 받는다.
- 외부로 데이터를 보내는 기능(텔레메트리, 모니터링 SaaS 등)은 넣지 않는다 — 넣으려면 팀장 승인.
