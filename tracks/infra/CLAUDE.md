# infra 트랙 규칙

> 이 문서는 루트 [`CLAUDE.md`](../../CLAUDE.md)를 **상속**한다. 루트 CLAUDE.md, `docs/SPEC.md`, `docs/BOUNDARIES.md`의 공통 규칙을 덮어쓰지 않으며, 아래는 트랙 전용 보완 규칙이다.

## 담당 범위

- 라벨: `infra` — `infra/**`, `tracks/infra/**`

## 보완 규칙

- 실제 배포 코드(k8s, helm 등)는 루트 `infra/`에 두고, 이 트랙 폴더에는 문서만 둔다.
- 배포 설정 변경은 되돌리기 어려운 변경이다 → 팀장 확인 + `docs/adr/` 기록 (루트 CLAUDE.md §3).
- 사용 도구는 `docs/SPEC.md`에 확정된 것만 쓴다 — 현재 `[설계 필요]`
- TODO: 환경 구분(dev/stage/prod), 시크릿 관리 규칙
