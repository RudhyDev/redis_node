import { Injectable } from '@nestjs/common';
import { AbstractCacheService } from './abstract-cache.service';

@Injectable()
export class CacheService {
  constructor(private readonly cacheService: AbstractCacheService) {}

  async get(key: string): Promise<string | null> {
    return this.cacheService.get(key);
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.cacheService.set(key, value, ttl);
  }

  async update(key: string, value: string, ttl: number): Promise<void> {
    await this.cacheService.update(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.cacheService.del(key);
  }
}
