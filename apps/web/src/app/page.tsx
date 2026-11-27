import { healthResponseSchema } from '@paperbird/schemas';
import { HealthBadge } from '@/components/HealthBadge';
import { description, main } from './page.css';

// api(#11)가 생기기 전까지 쓰는 예시 응답. 공유 스키마로 검증한 뒤 쓴다.
const sampleHealth = healthResponseSchema.parse({
  status: 'ok',
  timestamp: '2026-11-27T12:00:00.000Z',
});

export default function Home() {
  return (
    <main className={main}>
      <h1>PaperBird</h1>
      <p className={description}>지능형 문서 요약 및 딜리버리</p>
      <HealthBadge health={sampleHealth} />
    </main>
  );
}
