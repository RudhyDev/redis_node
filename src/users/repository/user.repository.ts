import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from 'src/config/redis';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly redis: RedisService,
  ) {}

  async findAll(): Promise<User[]> {
    const cachedUsers = await this.redis.get('users');

    if (!cachedUsers) {
      const users = await this.userModel.find().exec();
      await this.redis.set('users', JSON.stringify(users), 'EX', 10 * 60);
      console.log('\x1b[33m%s\x1b[0m', 'From Database');
      return users;
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
