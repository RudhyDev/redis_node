import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisService } from 'src/config/redis';
import { AbstractCacheService } from './abstract-cache.service';

@Module({
  providers: [
    CacheService,
    {
      provide: AbstractCacheService,
      useClass: RedisService,
    },
  ],
  exports: [CacheService, AbstractCacheService],
})
export class CacheModule {}
