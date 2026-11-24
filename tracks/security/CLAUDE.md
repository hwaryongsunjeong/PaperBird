# security 트랙 규칙

> 이 문서는 루트 [`CLAUDE.md`](../../CLAUDE.md)를 **상속**한다. 루트 CLAUDE.md, `docs/SPEC.md`, `docs/BOUNDARIES.md`의 공통 규칙을 덮어쓰지 않으며, 아래는 트랙 전용 보완 규칙이다.

## 담당 범위

- 라벨: `security` — `apps/security/**`, `sc-test/**`, `tracks/security/**`

## 보완 규칙

- 보안 앱 코드(미들웨어, 스캐너 등)는 `apps/security/`, 보안 테스트 스크립트/툴은 `sc-test/`에 둔다.
- 테스트 결과 수치는 `docs/test-records/`에 쌓는다 (스크립트와 분리).
- `legacy/`는 기존 하네스 원본 보관용이다. 수정하지 않는다 (설명: `legacy/ABOUT_LEGACY.md`).
- TODO: 테스트 대상 범위·허용 환경 (운영 환경 대상 공격 테스트 금지 여부 등)
