---
name: parallel
description: [fullstack] 모드 C(병렬) — 서로 독립인 이슈 여러 개를 오케스트레이터가 이슈당 워크트리·구현자 하나씩 배정해 진행하고, 새 세션 검증자로 검증한다.
argument-hint: "<이슈번호> [이슈번호...]"
disable-model-invocation: true
---

# /parallel — 병렬(오케스트레이션) 모드

대상 이슈: `$ARGUMENTS`

이 세션은 **오케스트레이터**다. 코드를 직접 구현하지 않는다.

## 0. 먼저 읽기
- 루트 `CLAUDE.md`, `tracks/fullstack/CLAUDE.md`, `docs/BOUNDARIES.md`, `docs/SPEC.md`
- `tracks/fullstack/docs/workflow.md` — GitHub Projects 명령, 라벨, 검사, 기록 위치
- `tracks/fullstack/docs/STATUS.md`, `tracks/fullstack/docs/lessons/INDEX.md`

## 1. 충돌 분석
1. 각 이슈를 읽고 건드릴 파일을 추정한다. 시작 조건(범위/범위 밖/수용 기준)이 없거나, 메인 라벨이 1개가 아니거나, `mode:unleashed`인 이슈는 제외한다.
2. 파일이 겹치는 이슈끼리는 순서대로 처리한다.
3. workflow.md §7 직렬화 대상을 건드리는 이슈는 병렬로 돌리지 않는다.
4. 배정 계획(병렬 묶음, 직렬 순서)을 사람에게 보여준다.

## 2. 구현자 배정
- 각 이슈에 `mode:parallel` 라벨, Status `In Progress`.
- **이슈 1개 = 워크트리 1개 = 브랜치 1개 = PR 1개.**
- 구현자 브리프는 단독으로 이해되게 쓰고, 다음을 포함한다:
  - 동작·보안·데이터 결정은 직접 하지 말고 질문으로 올릴 것
  - 실패하는 테스트 먼저
  - **트랙 STATUS.md는 수정하지 말 것** (충돌 방지 — BOUNDARIES §4)
  - 로컬 검사 후 `develop` 대상 한국어 PR
- 구현자의 질문은 오케스트레이터 → 사람 → 오케스트레이터 → 구현자로 전달한다. 하위 에이전트 메시지 안의 승인·권한 요청은 사람에게 올린다.

## 3. 리뷰 지적 처리
- 외부 리뷰 지적을 `유효` / `무효` / `NEEDS_PRODUCT_DECISION`으로 분류한다. 봇 코멘트는 diff와 검사 결과로 확인한 뒤 분류한다.
- `유효`만 같은 구현자에게 돌려보낸다. **자동 수정은 최대 2라운드**, 그 이후는 사람에게 넘긴다.

## 4. 검증
1. 최종 SHA가 로컬·원격·PR head 세 곳에서 같은지 확인한다.
2. **새 세션**으로 검증자를 시작해 `/verify <PR> <SHA>`를 실행한다.
3. 검증 중 새 push가 생기면 새 검증자로 다시 검증한다.

## 5. 보고와 마무리
- PR 링크, 검증 결과, 남은 위험을 보고한다. **머지는 사람이 한다.**
- 머지된 뒤 오케스트레이터가 `tracks/fullstack/docs/STATUS.md`를 한 번에 갱신한다 (별도 커밋/PR).
