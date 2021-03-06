/**
 * File that handles all the business logic related to user by
 * doing database calls using ORM
 * Services are also known as Providers
 */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const username = createUserDto.username;
    const alreadyCreated = await this.userRepository.findOne({ username });
    if (alreadyCreated)
      throw new ConflictException(
        'Username is already existed. Please sign up with a different username.',
      );
    const user = new User(
      createUserDto.username,
      createUserDto.password,
      createUserDto.profile_image,
    );
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async getUserById(userId: number): Promise<User> {
    const user: User = await this.userRepository.findOne({ user_id: userId });
    if (!user) throw new NotFoundException('User Not Found!');
    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }
}
