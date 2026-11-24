---
name: finish
description: [fullstack] 구현 작업을 마무리한다 — 로컬 검사, develop 대상 한국어 PR, 기록, 트랙 STATUS 갱신, push, SHA 확인, 독립 검증 요청. 모든 구현 작업 끝에 실행.
---

# /finish — 마무리

## 0. 먼저 읽기
- 루트 `CLAUDE.md`, `tracks/fullstack/CLAUDE.md`, `docs/BOUNDARIES.md`, `docs/SPEC.md`
- `tracks/fullstack/docs/workflow.md` — GitHub Projects 명령, 라벨, 검사, 기록 위치
- `tracks/fullstack/docs/STATUS.md`, `tracks/fullstack/docs/lessons/INDEX.md`

## 1. 범위 확인
- `git diff --name-only origin/develop...HEAD`로 변경 파일을 확인한다.
- BOUNDARIES `fullstack` 범위 밖 파일, `harness` 경로, 루트 `docs/STATUS.md`가 있으면 **중단**한다.

## 2. 로컬 검사
- workflow.md §6의 format / lint / type / test / build를 변경된 앱에 대해 실행한다.
- 새 검사 스크립트를 만들었다면, 일부러 결함을 넣은 사본에서 **실패하는지 먼저** 확인한다.
- **실행하지 않은 검사는 통과로 보고하지 않는다.** 명령이 TODO인 항목은 "미정의"로 보고한다.

## 3. 기록
- 결정이 있었으면 `/log`, 실수·유효 지적이 있었으면 `/lesson`.
- 되돌리기 어려운 결정은 `tracks/fullstack/docs/adr/ADR-<이슈번호>-<slug>.md`.
- `mode:seq`이면 `tracks/fullstack/docs/STATUS.md`를 갱신한다. `mode:parallel` 구현자는 갱신하지 않는다.

## 4. 커밋·PR
- 커밋: `<type>(fullstack): <요약>` — 한 커밋에 한 가지 변경 ([COMMIT_CONVENTION](../../../docs/conventions/COMMIT_CONVENTION.md))
- `gh pr create --base develop` — 제목은 커밋 형식, 본문은 PR 템플릿 항목(변경 요약, 영향받는 트랙, 범위 확인, 테스트, 팀장 승인 필요 여부) + `관련 이슈: #<번호>`
- Projects Status를 `In Review`로 변경

## 5. push와 확인
- push 후 로컬 `git rev-parse HEAD`, 원격 `git rev-parse origin/<브랜치>`, PR `gh pr view --json headRefOid`가 **모두 같은지** 확인한 뒤 보고한다.

## 6. 검증 요청
- 보고 끝에 "새 세션에서 `/verify <PR> <SHA>` 실행"을 요청한다. **머지하지 않는다.**
