---
name: log
description: [fullstack] 여러 선택지 중 결정을 내렸을 때 대화 내용으로 결정 일지를 작성한다.
argument-hint: "<주제>"
---

# /log — 결정 일지

주제: `$ARGUMENTS`

1. `docs/journal/YYYY-MM-DD-fullstack-<slug>.md`를 **새 파일로** 만든다. 기존 일지 파일은 수정하지 않는다.

```markdown
# <주제>
- 날짜 / 관련 이슈·PR:
## 배경
## 선택지
## 결정과 이유
## 결과
```

2. 사실만 쓴다. 확실하지 않은 내용은 "불확실"로 표시한다.
3. 되돌리기 어려운 결정이면 ADR(`tracks/fullstack/docs/adr/ADR-<이슈번호>-<slug>.md`)도 필요하다고 알린다.
4. 커밋 전에 초안을 사람에게 보여준다.
