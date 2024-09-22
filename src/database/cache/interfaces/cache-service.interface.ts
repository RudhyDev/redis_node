export interface ICacheService {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl: number): Promise<void>;
  update(key: string, value: string, ttl: number): Promise<void>;
  del(key: string): Promise<void>;
}
