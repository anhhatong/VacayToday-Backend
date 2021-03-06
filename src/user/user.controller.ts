/**
 * File that handles all the APIs related to user, particularly
 * receiving requests and sending responses to client
 */
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  NotAcceptableException,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOkResponse({ status: 201, type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    // call the database to perform CRUD
    const user: User = await this.userService.create(createUserDto);
    if (!user)
      throw new NotAcceptableException('Sign up failed! Please try again.');
    return { ...user, statusCode: 200 };
  }

  @Get('getbyid/:userId')
  @ApiOkResponse({ status: 200, type: User })
  async getUserById(@Param('userId') userId: number): Promise<User> {
    return await this.userService.getUserById(userId);
  }

  @Get('getbyusername/:username')
  @ApiOkResponse({ status: 200, type: User })
  async getUserByUsername(@Param('username') username: string): Promise<User> {
    return await this.userService.getUserByUsername(username);
  }
}
