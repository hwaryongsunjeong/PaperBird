import { Test, type TestingModule } from '@nestjs/testing';
import { healthResponseSchema } from '@paperbird/schemas';
import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = moduleRef.get(HealthController);
  });

  it('공유 스키마에 맞는 상태 응답을 돌려준다', () => {
    const body = controller.check();
    expect(healthResponseSchema.safeParse(body).success).toBe(true);
    expect(body.status).toBe('ok');
  });

  it('timestamp는 지금 시각이다', () => {
    const before = Date.now();
    const body = controller.check();
    const at = Date.parse(body.timestamp);
    expect(at).toBeGreaterThanOrEqual(before - 1000);
    expect(at).toBeLessThanOrEqual(Date.now() + 1000);
  });
});
