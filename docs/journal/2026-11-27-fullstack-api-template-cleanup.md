# Nest 12 템플릿 기본 구성 정리 (#11)

- 날짜: 2026-11-27 / 관련: #11

## 배경
`@nestjs/cli` 12의 `nest new`가 기본으로 다음을 만든다.
- `@nestjs/observe` + `ObserveModule`: 키를 설정하면 트레이스·로그·에러·메트릭을 외부 SaaS(NestJS Observe)로 보낸다
- `apps/api/CLAUDE.md`(`@AGENTS.md`)와 `AGENTS.md`: Observe 연결을 사용자에게 안내하고, 요청하면 대신 실행하라는 지시 포함
- `deploy` 스크립트와 `@nestjs/mau`(Nest 클라우드 배포 CLI), e2e용 `supertest`

## 결정과 이유
- **Observe 제거** — SPEC에 없고 외부 데이터 전송이다. 넣으려면 ADR + 팀장 승인.
- **하위 `CLAUDE.md` 삭제, `AGENTS.md`는 기술 정보만 남겨 재작성** — 하위 CLAUDE.md·AGENTS.md는 그 폴더에서 일하는 Claude·Codex에게 규칙으로 읽히므로, 하네스와 충돌하는 외부 서비스 유도 지시를 남기지 않는다.
- **`deploy`·`@nestjs/mau` 제거** — 배포 설정은 팀장 확인 대상.
- **`supertest`·e2e 제거** — SPEC에 없고 #11 수용 기준에 필요 없다. HTTP 확인은 서버를 띄워 직접 했다. e2e가 필요해지면 ADR로 추가.

## 결과
- `apps/api`는 Nest 공식 패키지(`@nestjs/common`·`core`·`platform-express`·`testing`·`cli`)와 SPEC 도구만 쓴다.
