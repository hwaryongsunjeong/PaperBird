# REA로 Confluence 문서 기능 제작, 프론트 스택 확정

- 날짜: 2026-11-27
- 관련: [2026-11-25 Rea 미사용 결정](2026-11-25-harness-unleash-and-labels.md)을 **일부 대체**

## 결정

1. **Confluence 스타일 문서 기능은 REA(https://github.com/morluto/rea)로 한 번에 제작한다.**
   - 2026-11-25에 "Rea를 쓰지 않는다"고 정했으나, Confluence 문서 기능에 한해 다시 쓰기로 했다. Jira 기능은 기존 결정대로 필요한 기능을 나열해 요청한다.
   - 작업 시 `/unleash`로 목줄을 풀고 진행한다.
   - 선행 조건: pnpm 워크스페이스, `packages/schemas`, `apps/web`, `apps/api` 초기 세팅이 끝난 상태.
   - REA는 역공학 분석 도구다. 동작·상호작용 패턴만 분석하고 Atlassian의 코드·에셋·브랜딩은 복사하지 않는다. 불확실: Atlassian 약관의 역공학 조항 적용 범위는 팀에서 확인 필요.
2. **프론트 스택**: pnpm, vanilla-extract, TanStack Query (Jotai 미도입), zod 공유 패키지 `packages/schemas` (`@paperbird/schemas`, seungyeol-portfolio의 `packages/schemas` 구조를 따름).
   - TanStack Query(서버 상태)와 Jotai(클라이언트 상태)는 대체 관계가 아니다. 앱이 API 데이터 중심이라 TanStack Query만 쓰고, 화면 상태는 React 기본 상태로 처리한다.
