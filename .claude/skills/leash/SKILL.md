---
name: leash
description: "[공통] 목줄 해제 모드를 끝낸다 — 해제 동안 규칙 밖에서 한 일을 정리하고, 후속 이슈를 만든 뒤 하네스 규칙을 다시 적용한다."
disable-model-invocation: true
---

# /leash — 목줄 다시 채우기

## 1. 확인
1. `.claude/unleashed`를 읽는다. 없으면 "해제 상태가 아님"을 알리고 멈춘다.
2. 대상 이슈와 기준 SHA(`start_sha`)를 확인한다.

## 2. 규칙 밖 작업 정리
기준 SHA 이후 해제 브랜치의 변경을 본다: `git diff --name-only <start_sha>...HEAD` (PR이 있으면 PR 기준).

다음을 분류해 표로 정리한다.

| 분류 | 확인 방법 |
|---|---|
| 메인 라벨 범위 밖 파일 | BOUNDARIES §2의 메인 라벨 경로와 비교 |
| 하네스 파일 수정 | BOUNDARIES §2 `harness` 경로와 비교 |
| 테스트 없이 들어간 코드 | 변경된 소스 대비 테스트 파일 유무 |
| 빠진 기록 | 트랙 STATUS, ADR(되돌리기 어려운 결정), 결정 일지 |

## 3. 후속 처리
1. 정리한 표를 사람에게 보여주고, 후속 이슈로 만들 항목을 확인받는다.
2. 확인된 항목만 후보 티켓으로 만든다: `docs/conventions/TICKET.md` 양식, 메인 라벨 1개(필요하면 서브 라벨) + `candidate`, 본문에 원래 이슈 링크. 다음 금요일 `/triage`에서 승인된다.
3. 해제 중 내린 결정이 있으면 `/log`로 기록한다.
4. 해당 트랙 `docs/STATUS.md`를 갱신한다.

## 4. 해제 종료
1. 이슈에서 `mode:unleashed` 라벨을 제거하고 "목줄 해제 종료" 코멘트를 남긴다 (후속 이슈 링크 포함).
2. `.claude/unleashed`를 삭제한다.
3. 이후 작업은 다시 루트 `CLAUDE.md` §5 규칙을 따른다고 알린다.
