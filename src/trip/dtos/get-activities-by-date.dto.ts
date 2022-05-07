/**
 * This file handles the CreateTrip API
 */
import { IsNotEmpty, IsString } from 'class-validator';

export class GetActivitiesByDateDto {
  @IsNotEmpty()
  @IsString()
  date: string;
}
