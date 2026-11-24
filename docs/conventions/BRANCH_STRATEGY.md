# 브랜치 전략

## 구조

```
main                    # 항상 배포 가능 상태. 보호 브랜치. 직접 push 금지.
├─ hotfix/...           # 운영 긴급 수정만 (아래 "긴급 수정" 참고)
└─ develop              # 주간 통합 브랜치. 매주 여기로 모아서 점검. GitHub 기본 브랜치.
    ├─ feat/fullstack/report-rag-search
    ├─ feat/infra/split-helm-chart
    ├─ feat/security/pii-masking
    ├─ docs/contracts/report-status-field
    └─ docs/harness/boundaries-label-update
```

## 브랜치 네이밍

`<type>/<트랙>/<짧은-설명>`

- type: `feat` | `fix` | `refactor` | `docs` | `test` | `chore` ([커밋 type](COMMIT_CONVENTION.md)과 동일)
- 트랙: `fullstack` | `infra` | `security` | `contracts` | `harness` ([BOUNDARIES.md](../BOUNDARIES.md) 라벨, [커밋 scope](COMMIT_CONVENTION.md)와 동일)
  - `contracts`: 공개 API 계약(`contracts/**`) 변경
  - `harness`: 하네스 문서·설정 변경 (루트 `CLAUDE.md`, `docs/SPEC.md`, `docs/BOUNDARIES.md`, `docs/conventions/**`, `.claude/**`, `.github/**` 등)
- 설명: **영문 소문자 kebab-case**, 짧게 (예: `rag-search`, `split-helm`)
  - 한글 등 영문 외 문자는 쓰지 않는다. 브랜치명은 Vercel 프리뷰 URL, Docker 이미지 태그, k8s 라벨, helm 릴리스명 등에 그대로 쓰이는데, 영문 외 문자는 이런 곳에서 깨지거나 거부된다.

예: `feat/security/pii-masking`, `fix/infra/env-drift`, `test/fullstack/report-approval-flow`

## 규칙

- GitHub 저장소의 **기본 브랜치는 `develop`**으로 설정한다.
  - PR은 모두 `develop`으로 향하는데, `Closes #12` 같은 키워드는 기본 브랜치에 머지될 때만 이슈를 자동으로 닫는다.
- `main`에는 `develop`을 거친 코드만 머지 (직접 PR 금지). 예외는 아래 "긴급 수정"뿐이다.
- `develop`은 주 1회 정기 통합 + 필요 시 수시 머지
- 트랙 접두어는 [BOUNDARIES.md](../BOUNDARIES.md)의 라벨과 동일한 단어 사용 — 브랜치명만 보고도 담당 트랙과 수정 범위를 유추할 수 있게 함
- 브랜치 수명은 짧게: 하나의 브랜치가 일주일 넘게 열려 있으면 `develop`과 다시 동기화할 것

## 긴급 수정 (hotfix)

운영(`main`)에서 다음 주간 통합까지 기다릴 수 없는 장애가 났을 때만 쓴다.

1. `main`에서 `hotfix/<트랙>/<짧은-설명>` 브랜치를 딴다.
2. `main` 대상 PR을 연다. **팀장 승인 필수** (트랙 내부 파일이라도).
3. 머지 후 즉시 `main`을 `develop`에 다시 머지해 두 브랜치를 맞춘다.
4. 장애 원인과 조치를 해당 트랙 `docs/lessons/`에 교훈으로 남긴다.
