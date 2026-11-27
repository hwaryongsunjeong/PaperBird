import { z } from 'zod';

// GET /health 응답 — api가 돌려주고 web이 검증한다
export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.iso.datetime(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
