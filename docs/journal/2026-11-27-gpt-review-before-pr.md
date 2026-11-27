# PR 전 GPT 코드 리뷰 도입, CodeRabbit 미사용

- 날짜: 2026-11-27
- 관련: `tracks/fullstack/docs/workflow.md` §11, `/finish`, `/parallel`

## 결정과 이유
- **CodeRabbit은 쓰지 않는다.** 외부 코드 리뷰는 GPT(Codex) 하나로 한다.
- **리뷰 시점은 PR 전**이다. 작업자가 구현과 로컬 검사를 끝내면 `/finish`가 자동으로 GPT 리뷰를 돌리고, 통과해야 PR을 연다.
- **대상은 `apps/web`, `apps/api`, `apps/ai`, `packages/**` 변경이다** (풀스택 코드 전체). 문서·하네스 변경은 제외.
- **연결 방식은 Orca CLI**다. `orca orchestration worker-start --agent codex`로 읽기 전용 리뷰 워커를 띄우고 `worker_done`으로 결과를 받는다. Claude 서브에이전트는 Claude 모델로만 돌기 때문에 GPT를 쓰려면 Orca 워커가 필요하다.
- **PR 후 `/verify`는 유지한다.** GPT 리뷰는 코드 자체를, `/verify`는 이슈 수용 기준 충족 여부를 본다.
- 통과 기준: 유효한 `Critical`·`High` 없음. 자동 수정 반복은 최대 2라운드.

## 불확실
- Orca가 없는 환경의 팀원은 GPT 리뷰를 돌릴 수 없다. 이 경우 PR을 만들지 않고 사람에게 알린다.
- 코드가 OpenAI(Codex)로 전송된다. 저장소는 public이다.
