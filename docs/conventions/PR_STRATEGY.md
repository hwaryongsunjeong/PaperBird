# PR 전략

## 머지 대상

모든 PR은 `develop`을 향함. `main`은 `develop`에서만 머지. 예외는 [긴급 수정](BRANCH_STRATEGY.md#긴급-수정-hotfix)뿐이다.

## 머지 방식

- 기능 PR → `develop`: **squash 머지**
  - PR 제목은 [커밋 컨벤션](COMMIT_CONVENTION.md) 형식으로 쓴다 (`feat(fullstack): ...`). squash 커밋 메시지가 PR 제목이 되므로, `develop` 이력에서 scope로 grep하면 PR 단위로 트랙별 이력이 나온다.
- 릴리스 `develop` → `main`, 긴급 수정 `main` → `develop` 역머지: **merge commit** (두 브랜치 이력을 보존)
- GitHub 저장소 설정에서 허용 방식을 위 두 가지로 제한한다.

## 승인 규칙

변경 대상 파일 기준으로 둘로 나눔.

| 변경 대상 | 승인 |
| --- | --- |
| 트랙 내부 파일 ([BOUNDARIES.md](../BOUNDARIES.md)의 트랙 라벨 경로) | 트랙 자체 리뷰로 머지 |
| 공통 파일 — `contracts`, `harness` 라벨 경로 ([`CLAUDE.md`](../../CLAUDE.md), `docs/SPEC.md`, `docs/BOUNDARIES.md`, `docs/conventions/**`, `contracts/**`, `.claude/**`, `.github/**` 등) | 팀장 승인 필수 |

PR 작성자가 템플릿의 "팀장 승인 필요 여부" 체크박스로 먼저 분류하고, 팀장은 그 표시만 보고 리뷰 큐를 정리한다.

공통 파일 승인은 `.github/CODEOWNERS`(공통 경로 owner = 팀장)와 브랜치 보호의 "Code Owner 리뷰 필수"로 강제한다.

## 템플릿

`.github/PULL_REQUEST_TEMPLATE.md` 사용. 핵심 항목(변경 요약, 영향받는 트랙, 범위 확인, 테스트, 승인 필요 여부)은 필수, 나머지(계약 변경 상세, 보안 체크, 배포/롤백, ADR 링크)는 접이식 선택 항목으로 둬서 가벼운 PR에 부담을 주지 않는다.

## 머지 전 확인

- [ ] [BOUNDARIES.md](../BOUNDARIES.md) 범위 내 파일만 수정했는지
- [ ] PR 제목이 커밋 컨벤션 형식인지
- [ ] 테스트 통과
- [ ] (공통 파일 수정 시) 팀장 승인 완료

## 되돌리기 어려운 변경

배포 설정, DB 스키마, 공개 API 계약처럼 되돌리기 어려운 변경은 트랙 내부 파일이라도 팀장 확인을 거치고, 관련 ADR을 `tracks/<트랙>/docs/adr/`에 남긴다.
