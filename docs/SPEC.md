# SPEC — 트랙별 기술스택 불변 규칙

## 불변 규칙

> **이 문서에 없는 기술로 벗어나려면 ADR을 먼저 작성하고 팀장 승인을 받는다.**
> 승인 전에는 해당 기술을 도입하는 코드·설정을 작성하지 않는다.

## 확정 기술스택

| 영역 | 경로 | 스택 | 상태 |
|---|---|---|---|
| 프론트 | `apps/web` | Next.js | `[확정]` |
| 백엔드 (비즈니스 로직) | `apps/api` | NestJS | `[확정]` |
| AI 서비스 (RAG·리스크 스코어링·LLM-judge) | `apps/ai` | FastAPI — 내부 전용, 외부 직접 노출 금지 | `[확정]` |
| 패키지 매니저 (web, api) | 저장소 전체 (pnpm 워크스페이스) | pnpm | `[확정]` |
| 스타일 | `apps/web` | vanilla-extract | `[확정]` |
| 스키마 검증 (web·api 공유) | `packages/schemas` (`@paperbird/schemas`) | zod — tsup 빌드, web·api가 워크스페이스 의존성으로 사용 | `[확정]` |
| 서버 상태 (web) | `apps/web` | TanStack Query | `[확정]` |
| 테스트 (TS 전체) | `apps/web`, `apps/api`, `packages/*` | Vitest | `[확정]` |
| 포맷 (TS 전체) | `apps/web`, `apps/api`, `packages/*` | Prettier (`singleQuote`, `trailingComma: all`) | `[확정]` |
| 린트 | `apps/api`, `packages/*` | oxlint (`--deny-warnings` — 경고도 실패) | `[확정]` |
| 린트 (web) | `apps/web` | ESLint (`eslint-config-next`) | `[확정]` |
| TypeScript | TS 전체 | ~6.0.3 (tsup 9 호환 확인 버전) | `[확정]` |
| 클라이언트 전역 상태 (web) | `apps/web` | 별도 라이브러리 없음 (React 기본 상태). Jotai 등은 도입하지 않음 — 필요하면 ADR | `[확정]` |
| Python 도구 (ai) | `apps/ai` | TODO: uv / poetry | `[설계 필요]` |
| 인프라 | `infra/` | TODO: 사용 도구 (k8s / helm / terraform 등) | `[설계 필요]` |
| 보안 | `apps/security`, `sc-test/` | TODO: 사용 도구 | `[설계 필요]` |

## 서비스 간 경계

- `apps/web`은 `apps/api`만 호출한다.
- `apps/ai`는 `apps/api`를 통해서만 접근한다 (내부 전용).
- TODO: DB, 벡터 스토어, LLM 공급자, 인증 방식

## 검사 명령 약속

모든 앱은 `format` / `lint` / `typecheck` / `test` / `build` 이름의 스크립트를 제공한다. 상세: [`tracks/fullstack/docs/workflow.md`](../tracks/fullstack/docs/workflow.md) §6
