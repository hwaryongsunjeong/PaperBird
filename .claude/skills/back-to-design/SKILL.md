---
name: back-to-design
description: [fullstack] 원하는 상호작용을 아직 말로 설명할 수 없을 때 구현안을 닫고 작업을 설계 단계로 되돌린다.
disable-model-invocation: true
---

# /back-to-design — 설계로 되돌리기

1. 지금까지 시도한 것, 각 안이 반려된 이유, 열린 질문을 정리한다.
2. 열린 구현안 PR을 정리 내용과 함께 닫는다.
3. 레퍼런스와 상호작용 명세를 요청하는 UX 이슈를 새로 만든다:
   `gh issue create --title "[UX] <원래 이슈 제목>" --label "fullstack,needs-design,candidate" --body-file <파일>`
   (본문은 `docs/conventions/TICKET.md` 양식, 원래 이슈 링크와 정리 내용 포함 — 다음 금요일 `/triage`에서 승인)
4. 원래 이슈를 Projects에서 `Blocked`로 두고 새 UX 이슈를 blocker로 연결한다. `mode:*` 라벨은 제거한다.
5. 설계 과정에서 얻은 통찰이 있으면 `/log`로 기록한다.
