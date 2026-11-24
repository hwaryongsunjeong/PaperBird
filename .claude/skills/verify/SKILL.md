---
name: verify
description: [fullstack] 구현에 참여하지 않은 새 세션에서 PR을 독립 검증한다. 코드는 수정하지 않고 심각도 표시된 지적만 PR 코멘트로 남긴다.
argument-hint: "<PR번호> <대상 SHA>"
---

# /verify — 독립 검증

입력: `$ARGUMENTS` (PR 번호, 대상 SHA)

이 세션은 **검증자**다. 코드를 수정하거나 커밋하지 않는다. 세부 규칙은 `tracks/fullstack/docs/test-agent-rules.md`를 따른다.

## 1. 자격 확인
1. 이 세션이 해당 PR 구현에 참여했다면 **중단**하고 새 세션을 요구한다.
2. `gh pr view <PR> --json headRefOid,headRefName,body` — 대상 SHA가 PR head와 다르면 **중단**한다.

## 2. 격리된 체크아웃
- 공유 체크아웃을 detach하지 않는다. `git worktree add ../pb-verify-<PR> <SHA>`로 별도 워크트리를 만든다.
- 검사가 끝나면 `git worktree remove ../pb-verify-<PR>`로 삭제한다.

## 3. 검증
1. 연결된 이슈의 **수용 기준**을 하나씩 확인한다.
2. workflow.md §6 검사를 직접 다시 실행한다 (보고된 결과를 믿지 않는다).
3. 테스트가 실제로 동작을 검증하는지 확인한다 (항상 참인 단언, 과도한 mock, 건너뛴 테스트).
4. UI 변경이면 상호작용 체크리스트: 모션 줄이기, 긴 한국어 문장 줄바꿈, 스크린리더 라벨.
5. BOUNDARIES 범위, `harness` 경로, 루트 STATUS 수정 여부.

## 4. 보고
- 맨 위에 **확인한 head SHA**를 적는다.
- 지적은 PR 코멘트 하나로 남긴다 (`gh pr comment <PR> --body-file <파일>`). 각 지적: 심각도(`Critical`/`High`/`Medium`/`Low`), 파일·줄, 실패 시나리오, 영향, 수정안. 추측성 스타일 지적은 하지 않는다.
- `Critical`/`High`가 있으면 머지 차단 사유임을 명시한다.
