import type { HealthResponse } from '@paperbird/schemas';
import { badge, tone } from './HealthBadge.css';

type HealthBadgeProps = {
  // 아직 응답을 받지 못했으면 undefined
  health: HealthResponse | undefined;
};

// 서버 상태를 배지로 보여주는 예시 컴포넌트
export function HealthBadge({ health }: HealthBadgeProps) {
  const isOk = health?.status === 'ok';
  return (
    <span className={badge}>
      <span className={isOk ? tone.ok : tone.pending}>
        {isOk ? '정상' : '확인 중'}
      </span>
    </span>
  );
}
