import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 30 })
  @IsInt()
  age: number;

  @ApiProperty({ example: 'New York' })
  @IsString()
  city: string;
}
