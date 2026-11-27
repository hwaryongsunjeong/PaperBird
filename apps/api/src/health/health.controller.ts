import { Controller, Get } from '@nestjs/common';
import { healthResponseSchema, type HealthResponse } from '@paperbird/schemas';

@Controller('health')
export class HealthController {
  // 서버 상태 확인 — web과 같은 공유 스키마로 응답 형태를 검증해서 돌려준다
  @Get()
  check(): HealthResponse {
    return healthResponseSchema.parse({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  }
}
