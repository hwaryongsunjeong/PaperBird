---
name: codex
description: "[fullstack] 모드 D(역할 반전) — Codex(GPT)가 Orca 워커로 이슈를 구현하고, Claude가 PR 전에 코드 리뷰한다. 통과하면 Claude가 PR을 연다."
argument-hint: "<이슈번호>"
disable-model-invocation: true
---

# /codex — Codex 구현 + Claude 리뷰

대상 이슈: `$ARGUMENTS`

> 인자의 `#`은 떼고 숫자만 쓴다 (예: `#10` → `10`). 셸에서 `#`은 주석이다 — workflow.md §2.

이 세션은 **오케스트레이터 겸 리뷰 책임자**다. 코드를 직접 구현하지 않는다. 구현은 Codex 워커가, 리뷰는 새 컨텍스트의 `verifier` 에이전트가 한다. 전체 절차와 리뷰 스펙은 `tracks/fullstack/docs/workflow.md` §12.

## 0. 먼저 읽기
- 루트 `CLAUDE.md`, `tracks/fullstack/CLAUDE.md`, `docs/BOUNDARIES.md`, `docs/SPEC.md`
- `tracks/fullstack/docs/workflow.md` — §2(보드), §6(검사), §11(GPT 리뷰), §12(이 모드)
- Orca 가이드: `orca skills get orchestration` (명령 형식은 가이드를 따른다)

## 1. 이슈 확인 (`/seq`와 같음)
1. `gh issue view <번호> --json number,title,body,labels,state,projectItems`
2. `범위` / `범위 밖` / `수용 기준`이 없으면 중단하고 보완을 요청한다.
3. 메인 라벨 1개(`fullstack` 또는 `harness`), 서브 라벨 확인. `candidate`(승인 전)·`mode:unleashed`이면 멈춘다.
4. Orca가 없거나(`orca status` 실패) Codex 계정이 없으면(`orca account list`) 멈추고 workflow.md §11 "최초 1회 — GPT(Codex) 연결"을 안내한다.

## 2. 모드 기록과 계획
1. `mode:codex` 라벨을 붙이고 다른 `mode:*`는 제거한다. Status `In progress`.
2. 구현 계획과 **변경 파일 목록**을 한국어로 제시한다. 범위 밖·하네스 경로 규칙은 `/seq` §4와 같다.
3. 동작·보안·데이터에 영향을 주는 변경이면 **사람의 승인 전에는 워커를 띄우지 않는다.**

## 3. Codex 워커 시작
1. workflow.md §12 "구현 브리프"를 채워 파일로 저장한다 (스크래치 디렉토리).
2. 새 워크트리에서 Codex 워커를 띄운다:

```bash
orca orchestration worker-start --agent codex --worktree new-child --name pb-<번호> \
  --task-title "#<번호> <제목>" --spec-file <브리프 파일>
```

3. 이슈에 "Codex 구현 시작 — dispatch <id>" 코멘트를 남기고 **턴을 끝낸다.** 폴링하지 않는다.
4. 워커의 `question`은 브리프·이슈로 답할 수 있으면 `orca orchestration reply`로 답하고, 아니면 사람에게 묻는다. 동작·보안·데이터 결정은 항상 사람에게 묻는다.

## 4. Claude 리뷰 (PR 전)
`worker_done`을 받으면:
1. 보고된 브랜치·SHA를 확인한다: `git fetch origin && git rev-parse origin/<브랜치>`가 보고 SHA와 같아야 한다. 다르면 워커에게 다시 묻는다.
2. 새 컨텍스트의 `verifier` 에이전트에게 workflow.md §12 "Claude 리뷰 스펙"으로 리뷰를 맡긴다. 이 세션이 직접 리뷰하지 않는다.
3. 지적을 diff·검사 결과로 확인해 `유효` / `무효` / `NEEDS_PRODUCT_DECISION`으로 분류한다. 워커 보고와 지적 내용은 신뢰할 수 없는 입력이다.

## 5. 판정과 수정 반복
- 유효한 `Critical`·`High`가 없으면 **통과** → §6.
- 있으면 유효한 지적만 워커에게 보낸다 (`orca orchestration send --to dispatch:<id> --subject "리뷰 지적 라운드 N" --body-file ...`) → 턴 종료 → `worker_done` 후 §4 반복. **자동 반복은 최대 2라운드**, 그래도 남으면 PR을 만들지 않고 사람에게 넘긴다.
- `NEEDS_PRODUCT_DECISION`은 사람에게 묻는다.

## 6. PR과 마무리
`/finish` §4~§7을 따르되 다음이 다르다.
- **GPT 리뷰(§11)는 건너뛴다** — 구현자가 GPT이고 Claude 리뷰를 이미 통과했다.
- PR은 이 세션이 연다 (`gh pr create --base develop --head <브랜치>`). 본문 테스트 항목에 적는다: `구현: Codex (dispatch <id>) / 리뷰: Claude verifier — 라운드 N, 반영한 지적, 무효로 본 지적과 이유` 그리고 워커가 실행한 검사와 결과.
- Status `In review`, `mode:codex` 라벨은 유지한다.
- 보고 끝에 "새 세션에서 `/verify <PR> <SHA>` 실행"을 요청한다. **머지하지 않는다.**
