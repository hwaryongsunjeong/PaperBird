---
name: lesson
description: [fullstack] 실수, 유효한 리뷰 지적, CI 실패, 하네스 오류를 교훈으로 기록한다. 같은 실수가 반복되면 방어 수준을 올린다.
argument-hint: "<무슨 일이 있었는지>"
---

# /lesson — 교훈 기록

사건: `$ARGUMENTS`

1. `tracks/fullstack/docs/lessons/INDEX.md`에서 같은 교훈이 있는지 먼저 찾는다.
2. **이미 있으면**: 그 교훈 파일에 재발 기록(날짜, 상황)을 추가하고 방어 수준을 **최소 한 단계** 올린다. 올린 수준의 조치(규칙/스킬 단계/자동 검사)를 제안하고 멈춘다.
3. **없으면**: `tracks/fullstack/docs/lessons/YYYY-MM-DD-<slug>.md`를 새로 만든다.

```markdown
# <제목>
- 날짜 / 관련 이슈·PR:
- 증상:
- 원인:
- 수정:
- 예방:
- 방어 수준: L0 | L1 | L2 | L3
```

4. 지금 가능한 가장 높은 방어 수준을 고른다 (L3 > L2 > L1 > L0, workflow.md §8).
5. `INDEX.md` 맨 아래에 한 줄 추가한다: `- [제목](파일명) — L<n>`. 기존 줄은 수정하지 않는다.
6. L1(CLAUDE.md 규칙)이나 L2(스킬 변경)는 하네스 변경이므로 직접 고치지 않고 `harness` 이슈로 제안한다.
7. 다른 트랙에도 해당하면 공통 승격(`docs/lessons/`)을 `harness` 이슈로 제안한다.
