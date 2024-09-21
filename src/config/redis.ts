import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  constructor() {
    super({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    });

    this.on('error', (err) => {
      console.log('Redis connection error');
      console.log(err);
      process.exit(1);
    });

    this.on('connect', () => {
      console.log('Redis connected');
    });
  }
}
