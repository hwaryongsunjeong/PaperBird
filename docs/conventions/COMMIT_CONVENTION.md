# 커밋 컨벤션

Conventional Commits 기반.

## 형식

```
<type>(<scope>): <한 줄 요약>
```

## type

| type     | 의미             |
| -------- | -------------- |
| feat     | 새 기능           |
| fix      | 버그 수정          |
| docs     | 문서만 변경         |
| refactor | 동작 변경 없는 구조 개선 |
| test     | 테스트 코드 추가/수정   |
| chore    | 빌드, 설정 등 잡무    |

[브랜치 type](BRANCH_STRATEGY.md)과 동일한 목록을 쓴다.

## scope

[BOUNDARIES.md](../BOUNDARIES.md) 라벨, [브랜치 트랙](BRANCH_STRATEGY.md)과 동일하게 통일:

`fullstack` | `infra` | `security` | `contracts` | `harness`

- `contracts`: 공개 API 계약(`contracts/**`) 변경
- `harness`: 하네스 문서·설정 변경 (루트 `CLAUDE.md`, `docs/SPEC.md`, `docs/BOUNDARIES.md`, `docs/conventions/**`, `.claude/**`, `.github/**` 등)

## 예시

```
feat(security): PII 마스킹 전처리 로직 추가
fix(infra): helm values 환경변수 누락 수정
docs(contracts): openapi.yaml 리포트 상태 필드 보완
refactor(fullstack): RAG 검색 결과 캐싱 로직 정리
docs(harness): BOUNDARIES 라벨에 harness 추가
```

## 규칙

- 한 커밋에 한 가지 변경만 (여러 트랙에 걸친 변경은 커밋을 나눌 것)
- 요약은 명령형으로, 끝에 마침표 없이
- scope를 커밋 로그에서 grep하면 트랙별 작업 이력을 바로 뽑을 수 있어야 함 — 그래서 scope 표기를 임의로 바꾸지 않음
- PR은 squash 머지하므로 **PR 제목도 이 형식**으로 쓴다. `develop`에는 PR 제목이 커밋 메시지로 남는다 ([PR 전략](PR_STRATEGY.md))
