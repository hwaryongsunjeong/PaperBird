# fullstack 트랙 규칙

> 이 문서는 루트 [`CLAUDE.md`](../../CLAUDE.md)를 **상속**한다. 루트 CLAUDE.md, `docs/SPEC.md`, `docs/BOUNDARIES.md`의 공통 규칙을 덮어쓰지 않으며, 아래는 트랙 전용 보완 규칙이다.

## 담당 범위

- 라벨: `fullstack` — `apps/web`, `apps/api`, `apps/ai`, `tracks/fullstack/**` (BOUNDARIES 기준)
- 보조 라벨 `area:web` / `area:api` / `area:ai`는 선택 사항이며 scope·브랜치에는 쓰지 않는다

## 보완 규칙

- 슬래시 명령(skill)은 루트 `.claude/skills/`에 둔다. 작업 스킬은 fullstack 트랙 워크플로우용이다 (스킬 수정은 `harness` 이슈).
- 작업 지시는 GitHub Projects 이슈 번호로 받는다. `gh` CLI로 읽고 갱신한다 — 명령, 라벨, 모드, 기록 위치는 [`docs/workflow.md`](docs/workflow.md)
- 작업 스킬: `/seq` `/compare` `/parallel` `/codex`(Codex 구현 + Claude 리뷰) `/pick` `/refine` `/retry` `/back-to-design` `/finish` `/verify` `/lesson` `/log` `/progress` — 전체 목록은 스킬 스택(`.claude/skills/README.md`)
- 모드는 사람이 슬래시 명령을 입력할 때만 바뀐다. 에이전트가 스스로 모드를 바꾸지 않는다.
- 구현자는 자기 작업을 검증하지 않는다. 검증은 새 세션의 `/verify`로 한다. 에이전트는 머지하지 않는다.
- `apps/ai`(FastAPI)는 내부 전용이다. `apps/web`에서 직접 호출하는 코드를 만들지 않는다.
- 테스트 코드는 [`docs/test-agent-rules.md`](docs/test-agent-rules.md)의 검증 대상이다.
- 트랙 결정은 `docs/adr/ADR-<이슈번호>-<slug>.md`, 교훈은 `docs/lessons/`(+ `INDEX.md`)에 기록한다.
- TODO: 프론트/백엔드 세부 규칙
