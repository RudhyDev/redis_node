import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { RedisService } from 'src/config/redis'; // Importa o RedisService existente

@Injectable()
export class AppService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly mongooseHealthIndicator: MongooseHealthIndicator,
    private readonly redisService: RedisService,
  ) {}

  @HealthCheck()
  async getHealthCheck(): Promise<{ status: string }> {
    const result = await this.health.check([
      async () =>
        this.mongooseHealthIndicator.pingCheck('mongoose', { timeout: 1500 }),
      async () => this.redisHealthCheck(),
    ]);

    if (result.status === 'ok') {
      return { status: 'ok' };
    } else {
      return { status: 'error' };
    }
  }

  private async redisHealthCheck(): Promise<HealthIndicatorResult> {
    try {
      await this.redisService.ping();
      return { redis: { status: 'up' } };
    } catch (err) {
      throw new HealthCheckError('Redis check failed', err);
    }
  }
}
