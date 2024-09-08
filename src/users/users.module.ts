import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/config/prisma';
import { UserRepository } from 'src/repositories/user-repository';
import { PrismaUserRepository } from 'src/repositories/prisma/prisma-user-repository';
import { RedisUserRepository } from 'src/repositories/cache/redis-user-repository';
import { RedisService } from 'src/config/redis';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    RedisService,
    PrismaUserRepository,
    {
      provide: UserRepository,
      useClass: RedisUserRepository,
    },
  ],
})
export class UsersModule {}
