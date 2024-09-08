import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user-repository';
import { User } from 'src/users/entities/user.entity';
import { PrismaService } from 'src/config/prisma';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findMany(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }
}
