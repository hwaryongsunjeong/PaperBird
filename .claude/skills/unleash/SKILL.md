---
name: unleash
description: "[공통] 목줄 해제 모드를 켠다 — 초기 스캐폴딩처럼 BOUNDARIES·절차 규칙이 방해되는 작업에서만, 사람이 입력했을 때 사용한다."
argument-hint: "<이슈번호>"
disable-model-invocation: true
---

# /unleash — 목줄 해제

대상 이슈: `$ARGUMENTS`

풀리는 규칙과 풀리지 않는 규칙은 루트 `CLAUDE.md` §6이 기준이다. 이 스킬은 그 범위를 넓히지 않는다.

## 1. 확인
1. `.claude/unleashed`가 이미 있으면 내용을 보여주고 멈춘다. 한 번에 하나의 해제만 허용한다.
2. `gh issue view $ARGUMENTS --json number,title,body,labels` — 이슈가 없으면 멈춘다.
3. 메인 라벨(`fullstack`/`infra`/`security`/`contracts`/`harness`)이 정확히 1개인지 확인한다. 없으면 사람에게 무엇을 붙일지 묻는다 — 브랜치·커밋 이름에 필요하다.
4. 왜 해제가 필요한지 한 문장으로 사람에게 확인받는다.

## 2. 해제
1. 이슈에 `mode:unleashed` 라벨을 붙이고, 다른 `mode:*`·`sub:*` 라벨은 제거한다.
2. `.claude/unleashed` 파일을 만든다 (git 무시 대상):

```
issue: <번호>
started_at: <ISO 시각>
start_sha: <git rev-parse origin/develop>
reason: <사람이 확인한 사유>
```

3. 이슈에 코멘트: "목줄 해제 시작 — 사유: ..., 기준 SHA: ...".
4. 브랜치를 만든다: `<type>/<메인 라벨>/<설명>` (최신 `origin/develop`에서).

## 3. 해제 중 규칙
- 루트 `CLAUDE.md` §6 "풀리지 않는 규칙"은 그대로 지킨다.
- 규칙 밖에서 한 일(범위 밖 파일, 하네스 수정, 건너뛴 테스트·기록)을 작업하면서 메모해 둔다. `/leash`가 이 메모로 정리한다.
- PR은 `develop` 대상, 본문에 "목줄 해제 PR — 팀장 리뷰 필요"를 적는다. 머지하지 않는다.

## 4. 보고
- 해제 상태, 대상 이슈, 기준 SHA, 그리고 "끝나면 `/leash`"를 알린다.
