import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class AppService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly mongooseHealthIndicator: MongooseHealthIndicator,
  ) {}

  @HealthCheck()
  async getHealthCheck(): Promise<{ status: string }> {
    const result = await this.health.check([
      async () =>
        this.mongooseHealthIndicator.pingCheck('mongoose', { timeout: 1500 }),
    ]);

    if (result.status === 'ok') {
      return { status: 'ok' };
    } else {
      return { status: 'error' };
    }
  }
}
