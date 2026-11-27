# PaperBird 디렉토리 명세

> 저장소 구조의 기준 문서다. 수정은 `harness` 라벨 + 팀장 승인.
> 마지막 갱신: 2026-11-24 — 스킬을 루트 `.claude/skills/`로 이동, `.github/`·`contracts/` 추가

```
PaperBird/
├── CLAUDE.md                        # 공통 하네스 규칙
├── setting.md                       # 이 문서 (디렉토리 명세)
├── .gitattributes                   # 색인 파일 merge=union
│
├── docs/
│   ├── STATUS.md                    # 전체 상태 — 팀장만 수정, 트랙 STATUS는 링크로만 참조
│   ├── BOUNDARIES.md                # 라벨(fullstack/infra/security/contracts/harness)별 수정 가능 경로
│   ├── SPEC.md                      # 트랙별 기술스택 불변 규칙
│   ├── conventions/
│   │   ├── BRANCH_STRATEGY.md
│   │   ├── COMMIT_CONVENTION.md
│   │   ├── PR_STRATEGY.md
│   │   └── TICKET.md                # 티켓 양식·주간 흐름 (금 16:00 후보 마감 → 팀장 승인)
│   ├── journal/                     # 결정 일지 — 항목마다 새 파일 (YYYY-MM-DD-<트랙>-<slug>.md)
│   └── lessons/                     # 공통으로 승격된 교훈만
│
├── .claude/
│   ├── settings.json                # 훅·권한 설정
│   ├── agents/                      # 역할 정의
│   └── skills/                      # 슬래시 명령 — 목록·상태는 skills/README.md (스킬 스택)
│                                     #   fullstack 12개 · 공통 unleash/leash · ticket/triage (초안)
│                                     #   security attack-log · access-audit (요청됨)
│
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── ISSUE_TEMPLATE/task.md       # 범위 / 범위 밖 / 수용 기준
│   └── CODEOWNERS                   # 공통 경로 owner = 팀장
│
├── package.json                     # pnpm 워크스페이스 루트
├── pnpm-workspace.yaml              # apps/*, packages/*
├── packages/
│   └── schemas/                     # @paperbird/schemas — web·api 공유 zod 스키마
├── contracts/                       # 공개 API 계약 (OpenAPI 등) — 팀장 승인
├── infra/                           # 실제 인프라 코드 (k8s, helm 등)
├── sc-test/                         # 보안 테스트 스크립트/툴 (결과 수치는 test-records/)
│
├── apps/
│   ├── web/                         # Next.js
│   ├── api/                         # NestJS
│   ├── ai/                          # FastAPI (내부 전용)
│   └── security/                    # 보안 앱 코드 (미들웨어, 스캐너 등)
│
└── tracks/
    ├── fullstack/
    │   ├── CLAUDE.md
    │   └── docs/
    │       ├── STATUS.md
    │       ├── workflow.md          # 스킬 공통 참조 (GitHub Projects, 라벨, 검사, 기록 위치)
    │       ├── test-agent-rules.md  # 테스트 검증 에이전트 규칙
    │       ├── adr/                 # ADR-<이슈번호>-<slug>.md
    │       └── lessons/             # + INDEX.md
    ├── infra/
    │   ├── CLAUDE.md
    │   └── docs/
    │       ├── STATUS.md
    │       ├── adr/
    │       └── lessons/
    └── security/
        ├── CLAUDE.md
        ├── docs/
        │   ├── STATUS.md
        │   ├── adr/
        │   ├── lessons/
        │   └── test-records/        # 공격 유형별 성공률, 오차 단위, 테스트 수치
        └── legacy/                  # 기존 하네스 원본 보관 (수정 금지)
```
