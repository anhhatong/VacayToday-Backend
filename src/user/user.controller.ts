/**
 * File that handles all the APIs related to user, particularly
 * receiving requests and sending responses to client
 */
import { Controller, Post, Body } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    // call the database to perform CRUD
    return await this.userService.create(createUserDto);
  }
}
