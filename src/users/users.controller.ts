import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/config/pagination.config';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { faker } from '@faker-js/faker';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({
    type: String,
    description: 'Create user',
    status: HttpStatus.CREATED,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    status: HttpStatus.BAD_REQUEST,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    type: UserResponseDto,
    description: 'Get all users',
    status: HttpStatus.OK,
  })
  async findAll(
    @Query('page') page: number = DEFAULT_PAGE,
    @Query('limit') limit: number = DEFAULT_LIMIT,
  ): Promise<{ users: User[]; total: number; pages: number }> {
    return this.usersService.findAll(page, limit);
  }

  @Get(':id')
  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'Maximum number of returned users',
    required: false,
    type: Number,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'Maximum number of returned users',
    required: false,
    type: Number,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'Maximum number of returned users',
    required: false,
    type: Number,
  })
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
