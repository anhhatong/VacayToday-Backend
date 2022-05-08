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

export class UpdateTripDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  num_people: number;

  @IsBoolean()
  @IsOptional()
  is_published: boolean;

  @IsString()
  @IsOptional()
  thumb_url: string;
}
