import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from 'src/config/redis';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/config/pagination.config';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly redis: RedisService,
  ) {}

  async findAll(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_LIMIT,
  ): Promise<{ users: User[]; total: number; pages: number }> {
    const cacheKey = `users:${page}:${limit}`;
    const cachedUsers = await this.redis.get(cacheKey);

    if (!cachedUsers) {
      const users = await this.userModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      const total = await this.userModel.countDocuments().exec();
      const pages = Math.ceil(total / limit);

      const cacheValue = JSON.stringify({ users, total, pages });
      await this.redis.set(cacheKey, cacheValue, 'EX', 10 * 60);

      console.log('\x1b[33m%s\x1b[0m', 'From Database');
      return { users, total, pages };
    }

    console.log('\x1b[33m%s\x1b[0m', 'From Cache');
    return JSON.parse(cachedUsers);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
