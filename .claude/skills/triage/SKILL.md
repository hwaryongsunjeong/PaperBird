---
name: triage
description: "[공통·팀장] candidate 라벨이 붙은 후보 티켓을 모아 중복·파일 겹침·작업량을 정리하고, 팀장의 결정(승인·병합·보류·반려)을 일괄 적용한다. 승인된 티켓은 candidate를 떼고 Status를 Todo로 바꾼다."
disable-model-invocation: true
---

# /triage — 후보 티켓 승인 (팀장)

팀장이 금요일 16:00 이후 실행한다. 양식 기준은 `docs/conventions/TICKET.md`.

## 1. 후보 모으기

```bash
gh issue list --label candidate --state open --limit 200 --json number,title,labels,assignees,author,body,createdAt
gh issue list --state open --limit 200 --json number,title,labels,body   # 승인된 열린 이슈 (비교용)
```

## 2. 정리표
후보마다 확인해 표로 보여준다.

| # | 제목 | 작성자 | 메인/서브 | 크기 | 양식 누락 | 중복 후보 | 파일 겹침 |
|---|---|---|---|---|---|---|---|

- **양식 누락**: TICKET.md §4 필수 섹션이 비었거나, 메인 라벨이 1개가 아님
- **중복 후보**: 다른 후보·열린 이슈와 범위가 비슷함
- **파일 겹침**: `예상 변경 영역`이 다른 티켓과 겹침 → 승인 시 순서 제안

아래에 작업량 요약을 붙인다: 트랙별·작성자별 S/M/L 개수, 지난주에서 넘어온 미완료 이슈 수.

## 3. 결정 받기
후보마다 팀장에게 하나를 받는다. 스킬이 대신 정하지 않는다 (제안은 할 수 있다).

| 결정 | 적용 |
|---|---|
| 승인 | `candidate` 라벨 제거, Projects Status `Todo`, 다음 주 Iteration |
| 병합 | 대상 이슈에 내용을 댓글로 옮기고, 이 후보는 "#N에 병합" 댓글 후 `gh issue close <번호> --reason "not planned"` |
| 보류 | `candidate` 유지, 댓글로 사유 |
| 반려 | 사유 댓글 후 `gh issue close <번호> --reason "not planned"` |
| 수정 후 승인 | 팀장이 말한 대로 본문·라벨을 고친 뒤 승인 처리 |

## 4. 적용
1. 결정 전체를 한 번 더 표로 보여주고 확인받은 뒤 일괄 적용한다.
2. Projects 정보(`tracks/fullstack/docs/workflow.md` §2)가 TODO면 라벨·댓글만 처리하고 Status·Iteration 단계는 건너뛴 사실을 알린다.

## 5. 보고
- 승인·병합·보류·반려 개수와 링크
- 파일이 겹치는 승인 티켓의 작업 순서
- "월요일 오전까지 각자 자기 티켓을 확인" 안내 문구 (팀 공지용으로 그대로 복사할 수 있게)
