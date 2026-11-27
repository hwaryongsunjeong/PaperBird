# fullstack 워크플로우 참조

> 루트 `.claude/skills/`의 12개 스킬(fullstack 워크플로우용)이 공통으로 참조하는 설정값과 절차다. 스킬마다 반복하지 않고 여기 한 곳에서 관리한다.
> 원형: <https://seungyeol-portfolio.vercel.app/workflow> — PaperBird 저장소 구조와 GitHub Projects에 맞게 조정했다.

## 1. 모드와 스킬

> 전 트랙 스킬 목록과 상태는 [스킬 스택](../../../.claude/skills/README.md)에서 관리한다.

| 분류 | 스킬 | 역할 | 모델 자동 호출 |
|---|---|---|---|
| 모드 A 순차 | `/seq <이슈>` | 구현자 1명이 한 작업 수행 | 금지 |
| 모드 B 비교 | `/compare <이슈>` | 의도적으로 다른 안 2개 구현 → 사람이 프리뷰 보고 선택 | 금지 |
| 모드 C 병렬 | `/parallel <이슈...>` | 독립 작업 여러 개를 오케스트레이터가 병렬 진행 | 금지 |
| 모드 D 역할 반전 | `/codex <이슈>` | Codex(GPT)가 구현, Claude가 PR 전 리뷰 (§12) | 금지 |
| 비교 후 전환 | `/pick <1\|2>` | 한 안 선택, 나머지 종료 | 금지 |
| | `/refine <피드백>` | 선택안을 순차 모드로 다듬기 | 금지 |
| | `/retry <싫은 점>` | 두 안 모두 반려, 새 라운드 (최대 2라운드) | 금지 |
| | `/back-to-design` | 구현 중단, 설계 단계로 되돌림 | 금지 |
| 마무리·검증 | `/finish` | 검사 → PR → 기록 → push | 허용 |
| | `/verify <PR> <SHA>` | 구현에 참여하지 않은 세션이 독립 검증 | 허용 |
| 기록·상태 | `/lesson <사건>` | 실수·유효 지적·CI 실패를 교훈으로 기록 | 허용 |
| | `/log <주제>` | 결정 일지 작성 | 허용 |
| | `/progress` | 읽기 전용 상태 보고 | 허용 |

- 모드는 사람이 슬래시 명령을 입력할 때만 바뀐다. 현재 모드는 이슈 라벨(`mode:*`)과 트랙 STATUS에 남겨 세션이 바뀌어도 유지된다.
- 원형의 `/status`는 Claude Code 내장 명령과 이름이 같아 `/progress`로 바꿨다.

## 2. GitHub Projects 설정

### 최초 1회 — 팀원 각자 자기 PC에서

`gh`의 기본 로그인 권한에는 Projects 접근(`project` scope)이 없다. 스킬이 Projects를 읽고 쓰려면 한 번 추가해야 한다.

```bash
gh auth login                 # 아직 로그인 안 했다면
gh auth refresh -s project    # project 권한 추가 (브라우저 인증 1회)
gh auth status                # Token scopes에 'project'가 보이면 완료
```

### 저장소·프로젝트 설정 (팀장)

- [x] 저장소 기본 브랜치 `develop`
- [x] 머지 방식: squash + merge commit만 허용 (rebase 비활성화)
- [x] `main`, `develop` 브랜치 보호 + CODEOWNERS 팀장(`@maru-dev4905`)
- [x] Project `PaperBird Kanban` 생성, Status에 `Blocked` 추가, `Iteration` 필드 추가 (2026-11-27)
- [x] Project 기본 워크플로우 켜짐 (Item added, Item closed, Pull request merged, Auto-add 등)
- [x] 라벨 생성 (§3) — 다시 만들 때:

```bash
for l in fullstack infra security contracts harness sub:fullstack sub:infra sub:security \
         candidate needs-design mode:seq mode:compare mode:parallel mode:codex mode:unleashed; do
  gh label create "$l" --force
done
```

### 프로젝트 값

| 항목 | 값 |
|---|---|
| Project | `PaperBird Kanban` — <https://github.com/orgs/hwaryongsunjeong/projects/2> |
| Owner / Number | `hwaryongsunjeong` / `2` |
| Project ID | `PVT_kwDOFX14yc4Bs-IT` |
| Status 필드 ID | `PVTSSF_lADOFX14yc4Bs-ITzhrJvWs` |
| Size 필드 ID | `PVTSSF_lADOFX14yc4Bs-ITzhrJvw8` |
| Iteration 필드 ID | `PVTIF_lADOFX14yc4Bs-ITzhrjoC4` (1주 단위, 월요일 시작) |

### Status와 티켓 단계

| Status | 옵션 ID | 언제 | 누가 바꾸나 |
|---|---|---|---|
| `Backlog` | `f75ad846` | `candidate` 후보 (승인 전) | 프로젝트 자동 추가 시 기본값 |
| `Ready` | `61e4505c` | 팀장 승인 완료, 작업 가능 | `/triage` |
| `In progress` | `47fc9ee4` | 작업 시작 | `/seq`, `/compare`, `/parallel`, `/unleash` |
| `Blocked` | `474ebedf` | 승인됐지만 선행 이슈·결정·외부 요인 때문에 진행 불가 | `/back-to-design`, 또는 작업자가 막혔을 때 |
| `In review` | `df73e18b` | PR 리뷰 중 | `/finish` |
| `Done` | `98236657` | 완료 | 프로젝트 자동 (이슈 닫힘·PR 머지) |

### Size

| 크기 | 옵션 ID | 기준 (TICKET.md §4) |
|---|---|---|
| `XS` | `6c6483d2` | 쓰지 않음 |
| `S` | `f784b110` | 반나절 이하 |
| `M` | `7515a9f1` | 1~2일 |
| `L` | `817d0097` | 3일 이상 |
| `XL` | `db339eb2` | 쓰지 않음 (나눈다) |

### 필드 바꾸는 명령

```bash
OWNER=hwaryongsunjeong; NUM=2; PROJECT_ID=PVT_kwDOFX14yc4Bs-IT

# 이슈 번호 → 프로젝트 항목 ID (이슈가 보드에 없으면 빈 값 → 먼저 추가)
ITEM=$(gh project item-list $NUM --owner $OWNER --limit 500 --format json \
  --jq ".items[] | select(.content.number==<이슈>) | .id")
[ -z "$ITEM" ] && ITEM=$(gh project item-add $NUM --owner $OWNER \
  --url https://github.com/hwaryongsunjeong/PaperBird/issues/<이슈> --format json --jq .id)

# Status 변경 (옵션 ID는 위 표)
gh project item-edit --id "$ITEM" --project-id $PROJECT_ID \
  --field-id PVTSSF_lADOFX14yc4Bs-ITzhrJvWs --single-select-option-id <옵션 ID>

# Size 변경
gh project item-edit --id "$ITEM" --project-id $PROJECT_ID \
  --field-id PVTSSF_lADOFX14yc4Bs-ITzhrJvw8 --single-select-option-id <옵션 ID>

# 다음 주 Iteration ID 찾기 (다음 월요일 시작 주차) → 지정
NEXT_MON=$(date -v+mon +%F 2>/dev/null || date -d "next monday" +%F)
ITER=$(gh api graphql -f query='{node(id:"PVTIF_lADOFX14yc4Bs-ITzhrjoC4"){... on ProjectV2IterationField{configuration{iterations{id startDate}}}}}' \
  --jq ".data.node.configuration.iterations[] | select(.startDate==\"$NEXT_MON\") | .id")
gh project item-edit --id "$ITEM" --project-id $PROJECT_ID \
  --field-id PVTIF_lADOFX14yc4Bs-ITzhrjoC4 --iteration-id "$ITER"
```

- `ITER`가 비면 해당 주차가 아직 없다 (현재 2026-W49 ~ W52까지 생성됨). 보드 설정 → Iteration에서 주차를 추가하라고 알리고 이 단계만 건너뛴다.
- 명령이 실패하면 실패한 단계와 오류를 보고하고, 성공한 것처럼 말하지 않는다.

### 이슈 번호 인자

- 스킬 인자의 이슈·PR 번호는 `#`을 떼고 숫자만 쓴다. 셸에서 `#10`은 주석으로 처리되어 `gh issue view #10`이 인자 없이 실행된다.
- 사람이 `/seq #10`처럼 입력해도 스킬은 `10`으로 바꿔서 쓴다.

### 기타

- `Closes #12` 같은 키워드는 PR이 **기본 브랜치**에 머지될 때만 이슈를 닫는다. 그래서 기본 브랜치를 `develop`으로 둔다 ([BRANCH_STRATEGY](../../../docs/conventions/BRANCH_STRATEGY.md)).
- PR이 머지되어 이슈가 닫히면 프로젝트 워크플로우가 Status를 `Done`으로 바꾼다.

## 3. 라벨

| 라벨 | 용도 |
|---|---|
| `fullstack` | **메인 라벨** — 담당 트랙 ([BOUNDARIES §1](../../../docs/BOUNDARIES.md)). 다른 트랙은 `infra`, `security`. 이슈당 정확히 1개 |
| `sub:fullstack` / `sub:infra` / `sub:security` | **서브 라벨** — 기능이 엮인 다른 트랙. 엮이지 않으면 붙이지 않는다 |
| `contracts` | 공개 API 계약 변경 (팀장 승인) |
| `area:web` / `area:api` / `area:ai` | 영역 라벨 `[선택 확장]` |
| `mode:seq` / `mode:compare` / `mode:parallel` / `mode:codex` | 현재 작업 모드 |
| `mode:unleashed` | 목줄 해제 모드 (`/unleash` · `/leash`, 루트 CLAUDE.md §6) |
| `candidate` | 승인 전 후보 티켓 — 작업 금지 ([TICKET](../../../docs/conventions/TICKET.md)) |
| `harness` | 하네스 문서 수정 이슈 (팀장 승인) |
| `needs-design` | `/back-to-design`으로 생성된 UX 이슈 |

## 4. 작업 시작 조건

`candidate` 라벨이 있으면(승인 전) 시작하지 않는다. 이슈 본문은 [TICKET](../../../docs/conventions/TICKET.md) 양식이며, 다음 세 가지가 없으면 시작하지 않고 보완을 요청한다.

```markdown
## 범위
## 범위 밖
## 수용 기준   (테스트로 확인 가능한 문장)
```

이슈 템플릿: [`.github/ISSUE_TEMPLATE/task.md`](../../../.github/ISSUE_TEMPLATE/task.md)

## 5. 브랜치

[BRANCH_STRATEGY](../../../docs/conventions/BRANCH_STRATEGY.md)를 따른다: `<type>/fullstack/<짧은-설명>`, 항상 최신 `develop`에서 분기.

- 비교 모드 변형: `<type>/fullstack/<설명>-r<라운드>-v<1|2>`
- 워크트리: `git worktree add ../pb-<이슈>-<변형> -b <브랜치> origin/develop`

## 6. 로컬 검사

**실행하지 않은 검사를 통과했다고 보고하지 않는다.** 스크립트가 아직 없는 앱은 "미정의"로 보고한다.

### 검사 이름 약속

스킬·CI·훅은 앱별 실제 도구(eslint, prettier, ruff, pytest 등)를 직접 부르지 않고 **아래 이름만 부른다.** 각 앱은 프로젝트를 세팅할 때 이 이름의 스크립트를 만들어 두면 된다. 그러면 도구를 바꿔도 스킬은 고칠 필요가 없다.

| 이름 | 의미 | 파일을 바꾸는가 |
|---|---|---|
| `format` | 포맷 검사 | 아니오 (검사만) |
| `format:fix` | 포맷 적용 | 예 — 검증·CI에서는 쓰지 않음 |
| `lint` | 린트 | 아니오 |
| `typecheck` | 타입 검사 | 아니오 |
| `test` | 테스트 | 아니오 |
| `build` | 빌드 | 아니오 (빌드 산출물만) |

| 앱 | 정의 위치 | 실행 |
|---|---|---|
| `apps/web` (Next.js) | `apps/web/package.json`의 `scripts` | `<패키지매니저> run <이름>` (apps/web에서) |
| `apps/api` (NestJS) | `apps/api/package.json`의 `scripts` | `<패키지매니저> run <이름>` (apps/api에서) |
| `apps/ai` (FastAPI) | `apps/ai/Makefile`의 같은 이름 타깃 | `make -C apps/ai <이름>` (`build`는 없어도 됨) |

- `[설계 필요]` 패키지 매니저(npm / pnpm)와 Python 도구(uv / poetry)는 `docs/SPEC.md`에서 확정한다.
- 앱이 생기면 위 표의 실행 명령이 그대로 동작하는지 한 번 확인하고, 이 절에서 `[설계 필요]`를 지운다.
- `[선택 확장]` 같은 명령을 GitHub Actions(`.github/workflows/`)와 Stop 훅(검사 실패 시 세션 종료 차단)에서도 재사용한다.

## 7. 직렬화 대상 (병렬 금지)

다음을 건드리는 작업은 `/parallel`에서도 하나씩 처리한다.

- `package.json`, lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `uv.lock`, `poetry.lock`)
- DB 마이그레이션 — TODO: 경로 확정
- 공유 디자인 토큰·테마 — TODO: 경로 확정
- `contracts/**`
- 하네스 경로 전체 ([BOUNDARIES §2 `harness`](../../../docs/BOUNDARIES.md)) — 원칙적으로 `harness` 이슈로 분리

## 8. 기록 위치

| 기록 | 위치 | 파일명 |
|---|---|---|
| 트랙 상태 | `tracks/fullstack/docs/STATUS.md` | — (병렬 중에는 머지 후 오케스트레이터만 갱신) |
| ADR | `tracks/fullstack/docs/adr/` | `ADR-<이슈번호>-<slug>.md` |
| 교훈 | `tracks/fullstack/docs/lessons/` | `YYYY-MM-DD-<slug>.md` + `INDEX.md`에 한 줄 |
| 결정 일지 | `docs/journal/` | `YYYY-MM-DD-fullstack-<slug>.md` |

- 루트 `docs/STATUS.md`는 수정하지 않는다 (팀장 전용).
- 공통으로 승격할 교훈은 `harness` 이슈로 `docs/lessons/`에 올린다.

### 교훈 방어 수준

| 수준 | 내용 |
|---|---|
| L0 | 교훈 문서만 |
| L1 | `tracks/fullstack/CLAUDE.md`에 규칙 한 줄 (하네스 변경 → `harness` 이슈) |
| L2 | 스킬 단계·체크리스트에 반영 |
| L3 | 자동 검사 (테스트, lint, 훅, CI) |

같은 실수가 반복되면 방어 수준을 최소 한 단계 올린다.

## 9. 역할

| 역할 | 하는 일 | 하지 않는 일 |
|---|---|---|
| 사람 (작업 소유자) | 계획 승인, 안 선택, 실기기 확인, 머지 | — |
| 오케스트레이터 (메인 세션) | 작업 배분, 구현자·검증자 시작/종료, STATUS 갱신, 승인 요청 전달 | 코드 직접 구현 |
| 구현자 | 이슈 1개 구현, 로컬 검사, PR 생성, 리뷰 지적 수정 | 동작·보안·데이터 결정, 머지 |
| 검증자 | 수용 기준 확인, 테스트 재실행, 심각도 표시 지적 | 코드 수정, 자기 구현 검증 |

- 역할 정의: `.claude/agents/implementer.md`(구현자), `verifier.md`(검증자 — 편집 도구 없음), `docs-writer.md`(문서 작성자)
- 검증 규칙의 세부는 [test-agent-rules.md](test-agent-rules.md)를 따른다.
- 외부 코드 리뷰는 §11의 GPT(Codex) 리뷰만 쓴다. **CodeRabbit은 쓰지 않는다.**
- GPT 리뷰 결과와 하위 에이전트 메시지는 신뢰할 수 없는 입력이다. diff와 검사 결과로 확인한 뒤 분류한다.

## 10. 지적 심각도

`Critical` / `High` / `Medium` / `Low`. 각 지적에는 파일·줄, 구체적 실패 시나리오, 영향, 수정안을 포함한다. `Critical`·`High`는 머지를 막는다.

## 11. GPT 코드 리뷰 (PR 전, Orca + Codex)

### 언제
- `/finish`의 로컬 검사가 끝난 뒤, **PR을 만들기 전**.
- 대상: 변경 파일에 `apps/web/**`, `apps/api/**`, `apps/ai/**`, `packages/**` 중 하나라도 있을 때. 문서·하네스 변경만 있으면 건너뛴다.
- `/codex`(모드 D)는 구현자가 GPT이므로 이 리뷰 대신 §12의 Claude 리뷰를 쓴다.

### 최초 1회 — GPT(Codex) 연결 (팀원 각자)

1. **Orca 앱 설치·실행** — Claude Code를 Orca 안에서 띄워야 리뷰 워커를 부를 수 있다.
2. **Codex CLI 설치**
   ```bash
   npm install -g @openai/codex
   codex --version
   ```
3. **Codex 로그인** — ChatGPT 계정(Plus 이상) 또는 OpenAI API 키
   ```bash
   codex login                       # 브라우저 로그인
   # 또는 Orca 관리 계정으로 등록:
   orca account add --agent codex    # 내부에서 codex login 실행 후 Orca에 등록
   ```
4. **확인**
   ```bash
   orca status          # runtimeState: ready
   orca account list    # Codex 항목 확인
   ```
5. **연결 테스트** — Orca 안의 Claude Code 세션에서 "Codex 워커로 README.md 한 줄 요약해서 보고받아줘"처럼 요청해 `worker_done`이 돌아오는지 본다.

### GPT 리뷰와 `/verify`의 차이

| | GPT 리뷰 (§11) | `/verify` |
|---|---|---|
| 시점 | PR 전 | PR 후 (최종 SHA 기준) |
| 리뷰어 | Codex (GPT), Orca 워커 | Claude, 새 컨텍스트의 `verifier` |
| 보는 것 | 코드 자체 — 버그, 보안, 설계, SPEC·BOUNDARIES 위반, 테스트 품질 | 이슈의 수용 기준 충족 여부, 검사 재실행, 상호작용 체크리스트 |
| 결과 | 통과해야 PR을 연다 | 지적을 PR 코멘트로 남긴다 (`Critical`·`High`는 머지 차단) |

### 실행
Orca 세션에서만 동작한다 (`ORCA_CLI_COMMAND`가 있거나 `orca` 명령이 있음). 명령 형식은 Orca 가이드(`orca skills get orchestration`)를 따른다.

```bash
orca orchestration worker-start --worktree current --agent codex --spec "<아래 리뷰 스펙>"
```

- 시작한 뒤 **턴을 끝낸다.** Orca가 `worker_done`으로 깨우면 결과를 받아 다음 단계로 간다. 폴링하지 않는다.
- Orca가 없거나 `worker-start`가 실패하면 PR을 만들지 않고 사람에게 알린다. 사람이 건너뛰라고 하면 PR 본문 테스트 항목에 "GPT 리뷰 미실행 (사유)"를 적는다.

### 리뷰 스펙 (그대로 채워서 보낸다)

```text
PaperBird 저장소의 PR 전 코드 리뷰. 읽기 전용이다.
- 파일을 수정·생성·삭제하지 말고, 커밋·push 하지 마라.
- 대상: git diff origin/develop...<브랜치> 중 apps/web/**, apps/api/**, apps/ai/**, packages/**
- 이슈: #<번호> — 수용 기준: <이슈 본문의 수용 기준>
- 기준 문서: docs/SPEC.md(스택 — pnpm, vanilla-extract, TanStack Query, zod 공유 packages/schemas),
  docs/BOUNDARIES.md(라벨 범위), tracks/fullstack/docs/workflow.md §10(심각도).
  apps/ai는 FastAPI 내부 전용 서비스 — 외부 노출 여부도 본다.
- 볼 것: 버그·예외 처리, 보안(입력 검증, 인증·권한, 시크릿 노출, PII), SPEC에 없는 기술 도입,
  BOUNDARIES 범위 밖 수정, 테스트가 실제 동작을 검증하는지
- 하지 말 것: 추측성 스타일 지적, diff 밖 코드에 대한 지적
- 출력: 지적마다 [심각도 Critical|High|Medium|Low] 파일:줄 / 실패 시나리오 / 영향 / 수정안.
  마지막 줄에 VERDICT: PASS (Critical·High 없음) 또는 VERDICT: FAIL
- 끝: 결과를 worker_done으로 보고한다. 지적이 없어도 VERDICT를 보고한다.
```

### 판정과 수정 반복
1. 받은 지적을 diff·검사 결과로 확인해 `유효` / `무효` / `NEEDS_PRODUCT_DECISION`으로 분류한다.
2. `Critical`·`High` 중 `유효`한 것이 없으면 **통과** → PR을 만든다. PR 본문 테스트 항목에 GPT 리뷰 결과(라운드 수, 반영한 지적, 무효로 본 지적과 이유)를 적는다.
3. `유효`한 `Critical`·`High`가 있으면 구현자가 고치고, 로컬 검사 후 다시 리뷰한다. **자동 반복은 최대 2라운드.** 그래도 남으면 PR을 만들지 않고 사람에게 넘긴다.
4. `NEEDS_PRODUCT_DECISION`은 사람에게 묻는다.
5. 유효한 지적은 `/lesson` 대상이다.

## 12. 모드 D — Codex 구현 + Claude 리뷰 (`/codex`)

§11의 반대 방향이다. 같은 이슈를 **Codex가 구현하고 Claude가 리뷰**한다.

| | 모드 A~C (기본) | 모드 D (`/codex`) |
|---|---|---|
| 구현 | Claude (`implementer` 또는 메인 세션) | Codex (Orca 워커, 새 워크트리) |
| PR 전 리뷰 | GPT (§11) | Claude `verifier` (이 절) |
| PR 생성 | 구현자 또는 오케스트레이터 | Claude 오케스트레이터 |
| PR 후 검증 | `/verify` (새 세션) | `/verify` (새 세션) |

준비: §11 "최초 1회 — GPT(Codex) 연결"이 끝나 있어야 한다.

### 구현 브리프 (Codex에게 보낸다)

```text
PaperBird 이슈 #<번호> 구현. 저장소 규칙을 먼저 읽어라:
CLAUDE.md, tracks/fullstack/CLAUDE.md, docs/BOUNDARIES.md, docs/SPEC.md, tracks/fullstack/docs/workflow.md §6

- 이슈: <제목>
- 범위 / 범위 밖 / 수용 기준: <이슈 본문 그대로>
- 승인된 계획과 변경 파일 목록: <§2에서 승인받은 내용>
- 수정 가능 경로: <메인 라벨 경로 + 서브 라벨 경로> — 이 밖의 파일은 수정하지 말고 질문하라
- 브랜치: origin/develop에서 <type>/<메인 라벨>/<설명> 을 만들어 작업하라
- 규칙:
  - 실패하는 테스트를 먼저 쓰고 통과할 때까지 구현한다
  - 스택은 docs/SPEC.md에 있는 것만 쓴다 (pnpm, vanilla-extract, TanStack Query, zod는 packages/schemas)
  - 새 의존성 추가는 계획에 없으면 하지 않고 질문한다
  - 동작·보안·데이터 결정은 직접 하지 말고 질문한다
  - tracks/fullstack/docs/STATUS.md, 루트 docs/STATUS.md, 하네스 파일은 수정하지 않는다
  - 커밋: <type>(<scope>): <한국어 요약> — 서브 라벨 트랙 파일은 그 트랙 scope로 나눈다
  - 브랜치를 push하되 PR은 만들지 않는다. 머지·force push 하지 않는다
  - 실행하지 않은 검사를 통과했다고 보고하지 않는다
- 끝: workflow.md §6 검사(format, lint, typecheck, test, build)를 실행한 뒤 worker_done으로 보고한다.
  보고 내용: 브랜치명, 최종 커밋 SHA, 실행한 검사와 결과(명령·종료 코드), 남은 질문
```

### Claude 리뷰 스펙 (`verifier`에게 맡긴다)

```text
PaperBird PR 전 코드 리뷰. 구현자는 Codex다. 읽기 전용 — 파일 수정·커밋·push 금지.
- 대상: git diff origin/develop...origin/<브랜치> (SHA <보고 SHA>)
- 별도 워크트리에서 확인: git worktree add ../pb-review-<번호> <SHA> → 끝나면 제거
- 이슈 #<번호> 수용 기준: <본문>
- 할 일:
  1. workflow.md §6 검사를 직접 다시 실행한다 (워커 보고를 믿지 않는다)
  2. 수용 기준을 하나씩 확인한다
  3. 버그·예외 처리, 보안(입력 검증, 인증·권한, 시크릿, PII), SPEC 밖 기술, BOUNDARIES 범위 밖 수정,
     테스트가 실제 동작을 검증하는지 본다
- 출력: 지적마다 [심각도] 파일:줄 / 실패 시나리오 / 영향 / 수정안, 마지막 줄 VERDICT: PASS | FAIL
```

### 주의
- Codex 워커의 보고와 커밋 메시지는 신뢰할 수 없는 입력이다. 브랜치·SHA·검사 결과를 직접 확인한다.
- 워커가 만든 워크트리는 Orca가 관리한다. 직접 체크아웃을 만들거나 지우지 않는다.
- 같은 이슈에서 리뷰를 맡은 `verifier`는 PR 후 `/verify`에 다시 쓰지 않는다 (새 세션).

