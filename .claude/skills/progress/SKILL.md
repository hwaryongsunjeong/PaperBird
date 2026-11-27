---
name: progress
description: [fullstack] 읽기 전용 상태 보고 — 트랙 STATUS와 GitHub Projects·PR 상태를 비교해 진행 중, 다음 작업, 사람 확인 필요, 불일치를 보고한다. 세션 시작 시나 현황 질문 시 사용.
---

# /progress — 상태 보고 (읽기 전용)

**아무것도 수정하지 않는다.** (원형의 `/status`는 Claude Code 내장 명령과 이름이 같아 `/progress`로 바꿨다.)

1. `tracks/fullstack/docs/STATUS.md`를 읽는다.
2. GitHub에 접근 가능하면:
   - `gh project item-list 2 --owner hwaryongsunjeong --format json` — 라벨 항목의 Status·Iteration (workflow.md §2)
   - `gh issue list --label fullstack --state open --json number,title,labels`
   - `gh pr list --base develop --json number,title,headRefName,isDraft,statusCheckRollup,reviewDecision`
3. 네 묶음으로 보고한다:
   - **진행 중**: 이슈, 모드 라벨, 연결된 PR, CI·리뷰 상태
   - **다음 작업**
   - **사람 확인 필요**: 승인 대기, `NEEDS_PRODUCT_DECISION`, `Blocked`, 실패한 CI
   - **불일치**: STATUS.md와 Projects가 다른 항목 (Projects가 기준)
4. GitHub에 접근하지 못했다면 그 사실과 원인을 밝히고 STATUS.md 기준으로만 보고한다.
