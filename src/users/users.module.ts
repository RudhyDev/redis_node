import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CacheModule } from 'src/database/cache/cache.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CacheModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
