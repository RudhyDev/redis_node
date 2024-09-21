import { faker } from '@faker-js/faker';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsAlphanumeric, IsEmail, IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  @ApiProperty({
    example: faker.person.fullName(),
    description: 'The user name',
    required: true,
    type: String,
  })
  @IsString()
  name: string;

  @Prop({ type: String, required: true, unique: true, lowercase: true })
  @ApiProperty({
    example: faker.internet.email(),
    description: 'The user email',
    required: true,
    uniqueItems: true,
    type: String,
  })
  @IsEmail()
  email: string;

  @Prop({ type: String, required: true, select: false })
  @Exclude({
    toPlainOnly: true,
  })
  @ApiProperty({
    example: faker.internet.password(),
    description: 'The user password',
    required: true,
    type: String,
  })
  @IsAlphanumeric()
  password: string;

  @Prop({ type: Number, required: true })
  @ApiProperty({
    example: Math.floor(Math.random() * 100),
    description: 'The user age',
    required: true,
    type: Number,
  })
  @IsNumber()
  age: number;

  @Prop({ type: String, required: true })
  @ApiProperty({
    example: faker.location.city(),
    description: 'The user city',
    required: true,
    type: String,
  })
  @IsString()
  city: string;

  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

//! -----------------  TRANSFORMER GLOBAL ---------------------------- //
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});
