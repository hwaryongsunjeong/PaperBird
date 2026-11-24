---
name: pick
description: [fullstack] /compare 이후 한 안을 선택하고 나머지 안의 PR을 닫는다.
argument-hint: "<1|2>"
disable-model-invocation: true
---

# /pick — 안 선택

선택: `$ARGUMENTS`

1. 이슈 코멘트에서 현재 라운드와 두 안의 PR을 확인한다.
2. 선택되지 않은 안의 PR을 이유와 함께 닫는다: `gh pr close <PR> --comment "<이유>"`
3. 이슈에 선택 이유를 코멘트로 남긴다.
4. 브랜치 삭제는 **사람이 확인한 뒤에만** 한다.
5. 다음 진행을 묻는다: 순차로 다듬기(`/seq` 흐름) 또는 여러 작업으로 나눠 병렬 진행(`/parallel`).
