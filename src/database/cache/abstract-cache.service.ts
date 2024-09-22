import { ICacheService } from './interfaces/cache-service.interface';

export abstract class AbstractCacheService implements ICacheService {
  abstract get(key: string): Promise<string | null>;
  abstract set(key: string, value: string, ttl: number): Promise<void>;
  abstract update(key: string, value: string, ttl: number): Promise<void>;
  abstract del(key: string): Promise<void>;
}
