# STATUS

> 전체 현재 상태와 다음 작업만 기록한다. 상세 내용은 각 트랙 STATUS에만 쓰고, 여기서는 한 줄 요약 + 링크로만 참조한다 (중복 기록 금지).
>
> **이 파일은 팀장만 수정한다** (주간 `develop` 통합 시). 트랙 PR·에이전트는 수정하지 않는다 — [BOUNDARIES §4](BOUNDARIES.md#4-공유-문서-충돌-방지-설계-필요)

## 현재 상태

- **초기 세팅 완료** (2026-11-24) — 디렉토리 구조와 하네스 문서 초안 생성. 코드는 아직 없음.

## 트랙별 요약

| 트랙 | 한 줄 요약 | 상세 |
|---|---|---|
| fullstack | 초기 세팅 완료, 작업 대기 | [tracks/fullstack/docs/STATUS.md](../tracks/fullstack/docs/STATUS.md) |
| infra | 초기 세팅 완료, 작업 대기 | [tracks/infra/docs/STATUS.md](../tracks/infra/docs/STATUS.md) |
| security | 초기 세팅 완료, 작업 대기 | [tracks/security/docs/STATUS.md](../tracks/security/docs/STATUS.md) |

## 다음 작업

- `docs/conventions/` 3개 문서 확정본 배치 (완료)
- 컨벤션 보완 반영 (완료) — `harness`/`contracts` 트랙, `test` type, 영문 브랜치명, hotfix, squash 머지
- GitHub 저장소 설정 — 기본 브랜치 `develop`, 브랜치 보호, CODEOWNERS 팀장 아이디 ([workflow.md §2](../tracks/fullstack/docs/workflow.md))
- 패키지 매니저 / Python 도구 확정 (`docs/SPEC.md`)
- SPEC의 인프라/보안 도구 확정
- 팀 논의 안건: [docs/journal/2026-11-24-jira-confluence-expansion.md](journal/2026-11-24-jira-confluence-expansion.md) §9
