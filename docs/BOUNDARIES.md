# BOUNDARIES — 라벨별 수정 가능 파일 범위

> GitHub Projects 이슈에 붙은 라벨이 에이전트/작업자가 수정할 수 있는 파일 범위를 결정한다.
> 이 문서 수정은 팀장 승인이 필요하다 (루트 `CLAUDE.md` §3).

## 1. 라벨 = 커밋 scope = 브랜치 트랙 접두어

세 곳에 **반드시 동일한 단어**를 사용한다 ([COMMIT_CONVENTION](conventions/COMMIT_CONVENTION.md), [BRANCH_STRATEGY](conventions/BRANCH_STRATEGY.md) 확정본 기준).

| 라벨 | 커밋 scope | 브랜치 | 담당 |
|---|---|---|---|
| `fullstack` | `feat(fullstack): ...` | `feat/fullstack/...` | fullstack 트랙 |
| `infra` | `fix(infra): ...` | `fix/infra/...` | infra 트랙 |
| `security` | `feat(security): ...` | `feat/security/...` | security 트랙 |
| `contracts` | `docs(contracts): ...` | `docs/contracts/...` | 팀장 승인 |
| `harness` | `docs(harness): ...` | `docs/harness/...` | 팀장 승인 |

- 트랙 내부 세분화(web/api/ai)가 필요하면 보조 라벨 `area:web`, `area:api`, `area:ai`를 함께 붙인다. 보조 라벨은 scope·브랜치에 쓰지 않는다. `[선택 확장]`

## 2. 라벨별 수정 가능 경로

### `fullstack`
- `apps/web/**`, `apps/api/**`, `apps/ai/**`
- `tracks/fullstack/**`

### `infra`
- `infra/**`
- `tracks/infra/**`

### `security`
- `apps/security/**`
- `sc-test/**`
- `tracks/security/**`

### `contracts` (팀장 승인)
- `contracts/**`

### `harness` (팀장 승인)
- 루트 `CLAUDE.md`
- `docs/SPEC.md`, `docs/BOUNDARIES.md`, `docs/conventions/**`
- `docs/lessons/**` (공통으로 승격된 교훈)
- `.claude/**` (settings.json, agents/, skills/)
- `tracks/*/CLAUDE.md` — 트랙 하네스라도 공통 규칙과 충돌할 수 있으므로 같은 절차를 따른다
- `.github/**` (PR·이슈 템플릿, CODEOWNERS, 워크플로우)
- `.gitattributes`

### 모든 라벨이 쓸 수 있는 공유 경로 (§4 쓰기 규칙 적용)
- `docs/journal/` — 새 파일 추가만 가능, 남의 파일 수정 금지
- `tracks/<자기 트랙>/docs/STATUS.md`

## 3. 티켓에 하네스 수정이 섞여 있을 때 `[설계 필요]`

원칙: **하네스 변경은 기능 변경과 같은 PR에 섞지 않는다.**

1. **처음부터 하네스 작업인 티켓**은 `harness` 라벨을 붙이고 팀장에게 배정한다. 트랙 라벨을 함께 붙이지 않는다.
2. **기능 작업 중 하네스 수정이 필요해진 경우**:
   1. 에이전트는 하네스 파일을 수정하지 않고 작업을 멈춘다.
   2. 필요한 변경, 사유, 영향을 정리해 `harness` 라벨 이슈를 새로 만든다 (본문에 원래 이슈 링크).
   3. 원래 이슈가 그 변경 없이 진행 불가하면 Projects에서 `Blocked`로 두고 새 이슈를 blocker로 연결한다. 진행 가능하면 그대로 진행한다.
3. **트랙 전용 하네스**(예: fullstack용 스킬 `.claude/skills/` 수정)도 `harness` 라벨로 처리하되, 승인은 해당 트랙 리드 + 팀장 확인으로 할 수 있다 — `[설계 필요]` 팀 논의
4. **강제 수단** (방어 수준 낮은 순):
   - 문서 규칙 (이 절)
   - 스킬 단계 — fullstack 스킬은 계획 단계에서 변경 파일 목록에 하네스 경로가 있으면 멈춘다
   - `.github/CODEOWNERS` + 브랜치 보호의 "Code Owner 리뷰 필수" — 하네스 경로는 팀장을 owner로 지정. 사람이 실수해도 머지가 막힌다 (TODO: 팀장 GitHub 아이디 입력)

### 여러 트랙에 걸친 티켓
- 상위 이슈 1개 + 트랙별 하위 이슈(sub-issue)로 나눈다. PR도 트랙별로 나눈다 (커밋 컨벤션 "한 커밋에 한 가지 변경"과 같은 원칙).
- 계약(`contracts`) 변경이 포함되면 계약 PR을 먼저 머지하고 트랙 PR이 뒤따른다.

## 4. 공유 문서 충돌 방지 `[설계 필요]`

여러 PR이 같은 파일의 같은 줄을 고치면 충돌이 난다. 그래서 **"한 파일은 한 명이 쓴다"** 또는 **"항목마다 새 파일"** 둘 중 하나로 설계한다.

| 문서 | 쓰는 사람 | 방식 |
|---|---|---|
| 루트 `docs/STATUS.md` | 팀장만 (주간 `develop` 통합 시) | 트랙 PR에서는 **수정 금지**. 트랙 상태는 링크로만 참조하므로 트랙 작업 때 고칠 필요가 없다 |
| `tracks/<트랙>/docs/STATUS.md` | 해당 트랙 | 순차 작업은 PR 안에서 갱신. 병렬 작업 중에는 구현 PR에서 수정하지 않고, 머지 후 오케스트레이터가 한 번에 갱신 |
| ADR | 작성자 | 파일명에 연번 대신 **이슈 번호** 사용 (`ADR-<이슈번호>-<slug>.md`) — 병렬 PR이 같은 번호를 잡는 충돌 방지 |
| journal / lessons | 작성자 | 항목마다 새 파일 (`YYYY-MM-DD-<트랙>-<slug>.md`). 기존 파일은 수정하지 않는다 |
| lessons `INDEX.md` | 작성자 | 한 줄 추가만. `.gitattributes`에 `merge=union` 지정 — TODO: 로컬 merge/rebase에서만 동작하므로 GitHub 웹 머지 충돌 시 수동 해결 |

추가 규칙:
- 진행 상황의 단일 기준(SSOT)은 **GitHub Projects**다. STATUS.md는 사람이 읽는 요약이며, 둘이 다르면 Projects를 기준으로 STATUS를 고친다.
- 브랜치가 일주일 넘게 열려 있으면 `develop`을 다시 받아온다 ([BRANCH_STRATEGY](conventions/BRANCH_STRATEGY.md)).
- `[선택 확장]` 루트 STATUS의 트랙 요약 표는 각 트랙 STATUS 첫 줄을 모아 생성하는 스크립트/Action으로 대체할 수 있다.
