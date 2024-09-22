import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { AbstractCacheService } from 'src/database/cache/abstract-cache.service';

@Injectable()
export class RedisService extends AbstractCacheService {
  private readonly client: Redis;

  constructor() {
    super();
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    });

    this.client.on('error', (err) => {
      console.log('Redis connection error');
      console.log(err);
      process.exit(1);
    });

    this.client.on('connect', () => {
      console.log('Redis connected');
    });
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.client.set(key, value, 'EX', ttl);
  }

  async update(key: string, value: string, ttl: number): Promise<void> {
    await this.client.set(key, value, 'EX', ttl);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
