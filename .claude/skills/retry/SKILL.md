---
name: retry
description: [fullstack] /compare의 두 안을 모두 반려하고 새 비교 라운드를 연다. 최대 2라운드.
argument-hint: "<마음에 들지 않은 점>"
disable-model-invocation: true
---

# /retry — 새 라운드

반려 사유: `$ARGUMENTS`

1. 현재 라운드 번호를 확인한다. **이미 2라운드를 진행했다면 3라운드를 열지 않고 `/back-to-design`을 제안한 뒤 멈춘다.**
2. 두 안의 PR을 반려 사유와 함께 닫는다. 브랜치는 참고용으로 남긴다.
3. 반려 사유를 새 두 안의 **강제 제약 조건**으로 이슈에 기록한다.
4. `/compare` 절차를 다음 라운드 번호로 다시 진행한다.
