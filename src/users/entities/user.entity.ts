import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ type: String, required: true })
  city: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
