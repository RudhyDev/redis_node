import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/config/pagination.config';
import { CacheService } from 'src/database/cache/cache.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly cacheService: CacheService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      await createdUser.save();

      const cacheKey = `user:${createdUser.email}`;
      await this.cacheService.set(
        cacheKey,
        JSON.stringify(createdUser),
        10 * 60,
      );

      return createdUser;
    } catch (error) {
      if (error && error.code === 11000) {
        throw new BadRequestException('Email já cadastrado em nossa base');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_LIMIT,
  ): Promise<{ users: User[]; total: number; pages: number }> {
    const users = [];
    const skip = (page - 1) * limit;

    const userDocs = await this.userModel.find().skip(skip).limit(limit).exec();

    for (const user of userDocs) {
      const cacheKey = `user:${user.email}`;
      const cachedUser = await this.cacheService.get(cacheKey);

      if (cachedUser) {
        console.log('\x1b[33m%s\x1b[0m', 'From Cache');
        users.push(JSON.parse(cachedUser));
      } else {
        users.push(user);
        await this.cacheService.set(cacheKey, JSON.stringify(user), 10 * 60);
      }
    }

    const total = await this.userModel.countDocuments().exec();
    const pages = Math.ceil(total / limit);

    return { users, total, pages };
  }

  async findOne(id: string): Promise<User> {
    const cacheKey = `user:${id}`;
    const cachedUser = await this.cacheService.get(cacheKey);

    if (cachedUser) {
      console.log('\x1b[33m%s\x1b[0m', 'From Cache');
      return JSON.parse(cachedUser);
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    await this.cacheService.set(cacheKey, JSON.stringify(user), 10 * 60);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    const cacheKey = `user:${updatedUser.email}`;
    await this.cacheService.set(cacheKey, JSON.stringify(updatedUser), 10 * 60);

    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    const cacheKey = `user:${deletedUser.email}`;
    await this.cacheService.del(cacheKey);

    return deletedUser;
  }
}
