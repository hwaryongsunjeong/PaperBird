---
name: seq
description: [fullstack] 모드 A(순차) — GitHub Projects 이슈 하나를 구현자 1명이 계획→승인→테스트 우선 구현→/finish까지 진행한다.
argument-hint: "<이슈번호>"
disable-model-invocation: true
---

# /seq — 순차 모드

대상 이슈: `$ARGUMENTS`

## 0. 먼저 읽기
- 루트 `CLAUDE.md`, `tracks/fullstack/CLAUDE.md`, `docs/BOUNDARIES.md`, `docs/SPEC.md`
- `tracks/fullstack/docs/workflow.md` — GitHub Projects 명령, 라벨, 검사, 기록 위치
- `tracks/fullstack/docs/STATUS.md`, `tracks/fullstack/docs/lessons/INDEX.md`

## 1. 이슈 확인
1. `gh issue view $ARGUMENTS --json number,title,body,labels,state,projectItems`
2. 본문에 `범위` / `범위 밖` / `수용 기준`이 없으면 **중단**하고 보완을 요청한다.
3. `fullstack` 라벨이 없으면 중단하고 사람에게 확인한다.

## 2. 모드 기록
- `gh issue edit $ARGUMENTS --add-label "mode:seq"` (다른 `mode:*` 라벨은 제거)
- Projects Status를 `In Progress`로 변경 (workflow.md §2)

## 3. 브랜치
- `git fetch origin && git switch -c <type>/fullstack/<설명> origin/develop`

## 4. 계획 제시 (한국어)
- 구현 계획과 **변경 파일 목록**을 제시한다.
- 변경 파일이 BOUNDARIES의 `fullstack` 범위 밖이면 중단한다.
- 변경 파일에 `harness` 경로가 있으면 중단하고 `harness` 이슈 분리를 제안한다 (BOUNDARIES §3).
- 동작·보안·데이터에 영향을 주는 변경이면 **사람의 승인 전에는 구현하지 않는다.**
- 되돌리기 어려운 변경(DB 스키마, 공개 API 계약, 배포 설정)이면 팀장 확인 + ADR이 필요함을 알린다.

## 5. 구현
1. 수용 기준을 확인하는 **실패하는 테스트를 먼저** 작성하고 실패를 확인한다.
2. 테스트가 통과할 때까지 구현한다.

## 6. 마무리
- `/finish`를 실행한다.
