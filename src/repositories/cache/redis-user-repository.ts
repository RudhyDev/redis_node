import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/config/redis';
import { User } from 'src/users/entities/user.entity';
import { PrismaUserRepository } from '../prisma/prisma-user-repository';
import { UserRepository } from '../user-repository';

@Injectable()
export class RedisUserRepository extends UserRepository {
  constructor(
    private readonly redis: RedisService,
    private readonly prismaUserRepository: PrismaUserRepository,
  ) {
    super();
  }
  async findMany(): Promise<User[]> {
    const cachedUsers = await this.redis.get('users');

    if (!cachedUsers) {
      const users = await this.prismaUserRepository.findMany();
      await this.redis.set('users', JSON.stringify(users), 'EX', 60);

      console.log('\x1b[33m%s\x1b[0m', 'From Database');

      return users;
    }

    console.log('\x1b[33m%s\x1b[0m', 'From Cache');
    return JSON.parse(cachedUsers);
  }
}
