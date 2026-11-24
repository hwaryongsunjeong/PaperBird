---
name: refine
description: [fullstack] /compare 이후 거의 맞는 안을 피드백대로 다듬는다. 순차 모드로 전환한다.
argument-hint: "<피드백 문장>"
disable-model-invocation: true
---

# /refine — 선택안 다듬기

피드백: `$ARGUMENTS`

1. 선택할 안이 분명하지 않으면 먼저 사람에게 묻는다.
2. 다른 안의 PR을 이유와 함께 닫고, 이슈에 피드백을 기록한다.
3. 라벨을 `mode:compare` → `mode:seq`로 바꾼다.
4. 선택한 브랜치에서 피드백을 반영한다. 모션 줄이기 처리는 유지한다.
5. draft PR을 ready로 바꾸기 전에 `/finish` 절차로 마무리한다.
