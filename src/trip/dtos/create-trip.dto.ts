/**
 * This file handles the CreateTrip API
 */
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsBoolean,
} from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  start_on: string;

  @IsOptional()
  end_on: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  num_people: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  likes: number;

  @IsBoolean()
  is_published: boolean;

  // user_id
  created_by: number;

  // TODO: TRIP_ZIP reference

  @IsString()
  @IsOptional()
  thumb_url: string;
}
