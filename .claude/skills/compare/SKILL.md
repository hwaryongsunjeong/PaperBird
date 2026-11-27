---
name: compare
description: [fullstack] 모드 B(비교) — 의도적으로 다른 구현안 2개를 병렬로 만들고 프리뷰를 비교해 사람이 고르게 한다. 상호작용이 많은 UI용.
argument-hint: "<이슈번호>"
disable-model-invocation: true
---

# /compare — 비교 모드

대상 이슈: `$ARGUMENTS`

## 0. 먼저 읽기
- 루트 `CLAUDE.md`, `tracks/fullstack/CLAUDE.md`, `docs/BOUNDARIES.md`, `docs/SPEC.md`
- `tracks/fullstack/docs/workflow.md` — GitHub Projects 명령, 라벨, 검사, 기록 위치
- `tracks/fullstack/docs/STATUS.md`, `tracks/fullstack/docs/lessons/INDEX.md`

## 1. 준비
1. 이슈, 관련 설계 문서, 이전 라운드 기록(이슈 코멘트)을 읽는다. `candidate` 라벨이 있으면 승인 전이므로 멈춘다.
2. 라운드 번호를 정한다. **3라운드가 되면 중단하고 `/back-to-design`을 제안한다.**
3. `mode:compare` 라벨을 붙이고 이슈에 "라운드 N 시작" 코멘트를 남긴다.

## 2. 브리프 2개
- 서로 **의도적으로 다른** 설계의 구현 브리프 2개를 쓴다. 각 브리프는 단독으로 읽어도 이해되게 쓴다.
- 차이 축을 명시한다 (예: 레이아웃, 상호작용 방식, 정보 밀도).

## 3. 병렬 구현
- 브랜치: `<type>/fullstack/<설명>-r<N>-v1`, `-r<N>-v2` — 각각 별도 워크트리 (workflow.md §5)
- 구현자 2명을 각 워크트리에서 실행한다. 각자 `develop` 대상 **draft PR**을 연다.
- 2라운드는 1라운드 브랜치를 재사용하지 않는다. 이전 브랜치는 참고용으로 남긴다.

## 4. 비교 코멘트
이슈에 한국어 비교 코멘트를 남긴다:
- 두 안의 차이
- 프리뷰 링크 — **실제로 생성된 프리뷰만** 링크한다 (TODO: 프리뷰 배포 방식 확정)
- 모션 줄이기(reduced motion) 처리 방식

## 5. 사람의 선택 대기
`/pick <1|2>`, `/refine <피드백>`, `/retry <싫은 점>`, `/back-to-design` 중 하나를 기다린다. 스스로 고르지 않는다.
