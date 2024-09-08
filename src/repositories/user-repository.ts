import { User } from '../users/entities/user.entity';

export abstract class UserRepository {
  abstract findMany(): Promise<User[]>;
}
