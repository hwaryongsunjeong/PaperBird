# PaperBird 공통 하네스 규칙

> 이 문서는 저장소 전체에 적용되는 공통 규칙이다. 각 트랙의 `tracks/<트랙>/CLAUDE.md`는 이 문서를 상속하며, 보완만 할 수 있고 덮어쓸 수 없다.

## 1. 프로젝트 컨텍스트

- **서비스명**: PaperBird
- **과제**: 지능형 문서 요약 및 딜리버리 앱 (풀스택·인프라·보안 3개 트랙 합반 캡스톤)
- **타깃**: 특정 도메인(대학원 랩실 등)에 묶이지 않는 범용 B2B 사내 협업 플랫폼
- **핵심 AI 파이프라인**
  - RAG 기반 문서 검색 + 근거 문서 링크 제공
  - PII 마스킹
  - 이중 리스크 스코어링 (사건 위험도 / 품질 위험도)
  - LLM-judge + 메타평가 (일치율 기반)
  - 보고서 생성 → 검토 → 승인 → 전달 워크플로우
- **신규 확장 기능**
  - Jira 스타일 문서 승인 칸반
  - Confluence 스타일 보고서 템플릿
  - 우측 RAG 챗봇 패널
  - 아틀라시안 식 계정/워크스페이스 온보딩
- **기술 스택** (상세·불변 규칙은 [`docs/SPEC.md`](docs/SPEC.md))
  - 프론트: Next.js (`apps/web`)
  - 백엔드: NestJS — 비즈니스 로직 (`apps/api`)
  - AI 서비스: FastAPI — RAG·리스크 스코어링·LLM-judge, **내부 전용** (`apps/ai`)
- **티켓 관리**: GitHub Projects
  - 서비스가 Jira 기능을 카피하는 것과 별개로, 실제 팀 작업 관리는 GitHub Projects를 사용한다.

## 2. 태그 체계

문서와 이슈에서 결정 상태를 다음 태그로 표시한다.

| 태그 | 의미 | 에이전트 행동 |
|---|---|---|
| `[확정]` | 팀 합의가 끝난 사항 | 그대로 따른다. 변경하려면 ADR + 승인 절차를 밟는다 |
| `[설계 필요]` | 방향은 있으나 세부 설계가 끝나지 않은 사항 | 임의로 확정하지 않는다. 설계안을 제시하고 승인을 받는다 |
| `[선택 확장]` | 핵심 범위 밖, 여유가 있을 때 추가하는 사항 | 핵심 작업보다 우선하지 않는다 |

## 3. 결정권 원칙

- **공통 파일 수정은 팀장 승인 필수**
  - `CLAUDE.md` (루트), `docs/SPEC.md`, `docs/BOUNDARIES.md`, `docs/conventions/**`, `contracts/`
  - `.claude/**`, `.github/**` 등 전체 목록은 [`docs/BOUNDARIES.md`](docs/BOUNDARIES.md) §2 `contracts`·`harness` 라벨
- **트랙 내부 파일은 해당 트랙 자체 승인**
  - 범위는 [`docs/BOUNDARIES.md`](docs/BOUNDARIES.md)의 라벨별 경로를 따른다.
- **되돌리기 어려운 변경은 트랙과 무관하게 팀장 확인 + ADR 기록**
  - 배포 설정
  - DB 스키마
  - 공개 API 계약
  - ADR은 해당 트랙의 `tracks/<트랙>/docs/adr/`에 기록한다.

## 4. 문서 맵

| 문서 | 역할 |
|---|---|
| [`docs/STATUS.md`](docs/STATUS.md) | 전체 현재 상태 / 다음 작업 (트랙 STATUS 요약 + 링크) |
| [`docs/BOUNDARIES.md`](docs/BOUNDARIES.md) | 라벨별 수정 가능 파일 범위 |
| [`docs/SPEC.md`](docs/SPEC.md) | 트랙별 확정 기술스택과 불변 규칙 |
| [`docs/conventions/`](docs/conventions/) | 브랜치 / 커밋 / PR / 티켓 컨벤션 |
| `tracks/<트랙>/CLAUDE.md` | 트랙 전용 보완 규칙 |
| [`.claude/skills/README.md`](.claude/skills/README.md) | 스킬 스택 — 전 트랙 슬래시 명령 목록·상태·등록 절차 |
| `.github/` | PR·이슈 템플릿, CODEOWNERS |
| `contracts/` | 공개 API 계약 |

## 5. 공통 작업 규칙

- 작업 시작 전 GitHub Projects 이슈의 라벨을 확인한다. 메인 라벨 1개 + 서브 라벨(`sub:<트랙>`) 0개 이상이며, 두 라벨의 BOUNDARIES 범위 밖 파일은 수정하지 않는다 ([BOUNDARIES §1](docs/BOUNDARIES.md)).
- 브랜치·커밋·PR은 `docs/conventions/`를 따른다.
- 작업 종료 시 해당 트랙의 `docs/STATUS.md`를 갱신한다. 루트 `docs/STATUS.md`는 팀장만 수정한다.
- 기능 작업 중 하네스 파일 수정이 필요하면 직접 고치지 않고 `harness` 이슈로 분리한다 ([BOUNDARIES §3](docs/BOUNDARIES.md)).
- 공유 문서는 "한 파일 한 작성자" 또는 "항목마다 새 파일" 규칙을 따른다 ([BOUNDARIES §4](docs/BOUNDARIES.md)).
- 진행 상황의 단일 기준은 GitHub Projects다.
- 티켓은 [`docs/conventions/TICKET.md`](docs/conventions/TICKET.md) 양식으로, 항상 `candidate` 라벨을 붙여 만든다. 금요일 팀장 승인(`/triage`) 전에는 그 티켓으로 작업하지 않는다.
- TODO: 공통 lessons 승격 절차

## 6. 목줄 해제 모드

사람이 `/unleash`를 입력해 `.claude/unleashed` 파일이 있고 대상 티켓에 `mode:unleashed` 라벨이 있을 때만 적용한다. `/leash`로 해제한다 ([BOUNDARIES §5](docs/BOUNDARIES.md)).

**풀리는 규칙**
- BOUNDARIES 라벨 범위 제한 (트랙을 넘나들며 수정 가능)
- 하네스 수정의 `harness` 이슈 분리 — 같은 PR에서 하네스 파일을 고칠 수 있다
- 계획 승인 대기, 실패하는 테스트 먼저 작성
- 모드 라벨, 트랙 STATUS·ADR 기록 (해제 시 `/leash`가 한 번에 정리)

**풀리지 않는 규칙**
- `.env`·시크릿 읽기·커밋 금지
- force push, `git reset --hard`, `rm -rf` 등 되돌릴 수 없는 명령 금지
- 에이전트의 머지 금지, `main`·`develop` 직접 push 금지
- 실행하지 않은 검사를 통과로 보고하지 않는다
- 되돌리기 어려운 변경(배포 설정, DB 스키마, 공개 API 계약)은 여전히 팀장 확인
- 이 모드의 PR은 팀장 리뷰 필수
