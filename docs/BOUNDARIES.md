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

- 트랙 내부 세분화(web/api/ai)가 필요하면 영역 라벨 `area:web`, `area:api`, `area:ai`를 함께 붙인다. 영역 라벨은 scope·브랜치에 쓰지 않는다. `[선택 확장]`

### 메인 라벨과 서브 라벨

`mode:unleashed`가 **없는** 모든 티켓에 적용한다 (목줄 해제 티켓은 §5).

| 구분 | 개수 | 값 | 의미 |
|---|---|---|---|
| 메인 라벨 | **정확히 1개** | `fullstack` / `infra` / `security` / `contracts` / `harness` | 담당 트랙. 브랜치 트랙 접두어, 커밋 scope, 기본 수정 범위를 정한다 |
| 서브 라벨 | 0개 이상 | `sub:fullstack` / `sub:infra` / `sub:security` | 기능이 엮여 있는 다른 트랙. 그 트랙 경로 수정을 허용하고, 그 트랙의 리뷰를 받는다 |

- 다른 트랙과 엮이지 않은 작업은 **메인 라벨만** 붙인다.
- 예: 백엔드 기능인데 보안이 엮여 있음 → `fullstack` + `sub:security`
- 서브 라벨은 메인 라벨과 같은 트랙일 수 없다 (`fullstack` + `sub:fullstack` 금지).
- `contracts`, `harness`는 서브 라벨로 쓰지 않는다. 계약·하네스 변경은 항상 별도 이슈로 분리한다 (§3).
- 서브 라벨 트랙 경로를 수정한 커밋은 그 트랙의 scope로 나눠 쓴다 (예: `feat(security): ...`). 브랜치와 PR 제목은 메인 라벨을 따른다.

## 2. 라벨별 수정 가능 경로

> 수정 가능 범위 = **메인 라벨 경로 + 서브 라벨 트랙의 경로**. 서브 라벨이 없으면 메인 라벨 경로만.

### `fullstack`
- `apps/web/**`, `apps/api/**`, `apps/ai/**`
- `packages/**` (web·api 공유 패키지 — 예: `packages/schemas`)
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
- 루트 `package.json`, `pnpm-workspace.yaml` (pnpm 워크스페이스 설정)

### 모든 라벨이 쓸 수 있는 공유 경로 (§4 쓰기 규칙 적용)
- `pnpm-lock.yaml` — 의존성을 바꾼 작업이면 어느 트랙이든 수정한다. 직렬화 대상이라 `/parallel`에서 동시에 바꾸지 않는다 (`tracks/fullstack/docs/workflow.md` §7)
- `docs/journal/` — 새 파일 추가만 가능, 남의 파일 수정 금지
- `tracks/<자기 트랙>/docs/STATUS.md`

## 3. 티켓에 하네스 수정이 섞여 있을 때 `[설계 필요]`

원칙: **하네스 변경은 기능 변경과 같은 PR에 섞지 않는다.**

1. **처음부터 하네스 작업인 티켓**은 `harness` 라벨을 붙이고 팀장에게 배정한다. 트랙 라벨을 함께 붙이지 않는다. `/seq`로 작업할 수 있으며, PR은 팀장 승인(Code Owner 리뷰) 대상으로 표시된다.
2. **기능 작업 중 하네스 수정이 필요해진 경우**:
   1. 에이전트는 하네스 파일을 수정하지 않고 작업을 멈춘다.
   2. 필요한 변경, 사유, 영향을 정리해 `harness` + `candidate` 라벨 후보 티켓을 만든다 ([TICKET](conventions/TICKET.md) 양식, 본문에 원래 이슈 링크). 다음 금요일 승인 대상이다.
   3. 원래 이슈가 그 변경 없이 진행 불가하면 Projects에서 `Blocked`로 두고 새 이슈를 blocker로 연결한다. 진행 가능하면 그대로 진행한다.
3. **트랙 전용 하네스**(예: fullstack용 스킬 `.claude/skills/` 수정)도 `harness` 라벨로 처리하되, 승인은 해당 트랙 리드 + 팀장 확인으로 할 수 있다 — `[설계 필요]` 팀 논의
4. **강제 수단** (방어 수준 낮은 순):
   - 문서 규칙 (이 절)
   - 스킬 단계 — fullstack 스킬은 계획 단계에서 변경 파일 목록에 하네스 경로가 있으면 멈춘다
   - `.github/CODEOWNERS` + 브랜치 보호의 "Code Owner 리뷰 필수" — 하네스 경로는 팀장을 owner로 지정. 사람이 실수해도 머지가 막힌다 (TODO: 팀장 GitHub 아이디 입력)

### 여러 트랙에 걸친 티켓
- 한 기능에 다른 트랙이 **일부** 엮인 경우 → 메인 라벨 + 서브 라벨로 PR 하나에서 처리한다 (커밋은 트랙 scope별로 나눔).
- 트랙별 작업이 각각 독립적으로 클 경우 → 상위 이슈 1개 + 트랙별 하위 이슈(sub-issue)로 나누고 PR도 트랙별로 나눈다.
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

## 5. 목줄 해제 모드 (`/unleash` · `/leash`)

초기 스캐폴딩처럼 BOUNDARIES·절차 규칙이 오히려 방해가 되는 작업에 한해, 사람이 `/unleash`를 입력했을 때만 켜진다. 에이전트가 스스로 켜지 않는다.

- 티켓에 `mode:unleashed` 라벨이 붙는다. 메인 라벨은 브랜치·커밋 이름을 정하는 용도로만 1개 붙이고, 서브 라벨은 붙이지 않는다 (범위 제한이 없으므로).
- 로컬 표시 파일 `.claude/unleashed`가 생긴다 (git 무시). 앞으로 훅으로 규칙을 강제할 때 이 파일이 있으면 예외로 처리한다.
- 풀리는 규칙과 풀리지 않는 규칙은 루트 [`CLAUDE.md`](../CLAUDE.md) §6이 기준이다.
- 이 모드로 만든 PR은 트랙과 무관하게 **팀장 리뷰**를 받는다.
- 끝나면 `/leash`로 규칙 밖에서 한 일을 정리하고 후속 이슈를 만든 뒤 해제한다.
