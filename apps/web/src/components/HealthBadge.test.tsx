import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { HealthBadge } from './HealthBadge';
import { badge } from './HealthBadge.css';

describe('HealthBadge', () => {
  it('정상 응답이면 vanilla-extract 클래스와 상태 문구를 렌더링한다', () => {
    const html = renderToString(
      <HealthBadge
        health={{ status: 'ok', timestamp: '2026-11-27T12:00:00.000Z' }}
      />,
    );
    expect(badge).toBeTruthy();
    expect(html).toContain(`class="${badge}"`);
    expect(html).toContain('정상');
  });

  it('응답이 없으면 확인 중 문구를 렌더링한다', () => {
    const html = renderToString(<HealthBadge health={undefined} />);
    expect(html).toContain('확인 중');
  });
});
