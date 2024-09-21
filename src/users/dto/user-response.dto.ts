import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsNumber } from 'class-validator';

export class UserResponseDto extends PartialType(
  OmitType(User, ['password'] as const),
) {
  @ApiProperty({
    example: 1,
    description: 'Maximum number of returned users',
    required: false,
    type: Number,
  })
  @IsNumber()
  limit?: number;

  @ApiProperty({
    example: 1,
    description: 'Page number',
    required: false,
    type: Number,
  })
  @IsNumber()
  page?: number;
}
