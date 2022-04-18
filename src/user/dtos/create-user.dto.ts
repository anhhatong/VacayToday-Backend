/**
 * Dto (data transfer object): File that maps objects to domain models
 * This file handles the CreateUser API
 */
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  profile_image: string;
}
