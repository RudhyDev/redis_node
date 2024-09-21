import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class CreateUserDto {
  @ApiProperty({ example: faker.person.fullName() })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: faker.internet.email() })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: faker.internet.password() })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 30 })
  @IsNotEmpty()
  @IsInt()
  age: number;

  @ApiProperty({ example: 'New York' })
  @IsNotEmpty()
  @IsString()
  city: string;
}
