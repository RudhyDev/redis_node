import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHealthCheck(): Promise<{ status: string }> {
    return await this.appService.getHealthCheck();
  }
}
