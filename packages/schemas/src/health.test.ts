import { describe, expect, it } from 'vitest';
import { healthResponseSchema } from './index';

describe('healthResponseSchema', () => {
  it('정상 응답을 통과시킨다', () => {
    const result = healthResponseSchema.safeParse({
      status: 'ok',
      timestamp: '2026-11-27T12:00:00.000Z',
    });
    expect(result.success).toBe(true);
  });

  it('status가 ok가 아니면 거부한다', () => {
    const result = healthResponseSchema.safeParse({
      status: 'down',
      timestamp: '2026-11-27T12:00:00.000Z',
    });
    expect(result.success).toBe(false);
  });

  it('timestamp가 ISO 날짜 문자열이 아니면 거부한다', () => {
    const result = healthResponseSchema.safeParse({
      status: 'ok',
      timestamp: '어제',
    });
    expect(result.success).toBe(false);
  });
});
