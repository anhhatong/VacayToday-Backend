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
  Max,
} from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  act_title: string;

  @IsString()
  @IsOptional()
  act_description: string;

  @IsString()
  @IsOptional()
  location_name: string;

  @IsString()
  @IsOptional()
  location_address: string;

  @IsString()
  @IsOptional()
  location_contact: string;

  @IsString()
  @IsOptional()
  location_to: string;

  @IsString()
  @IsNotEmpty()
  act_from: string;

  @IsString()
  @IsNotEmpty()
  act_to: string;

  @IsBoolean()
  @IsOptional()
  is_booked: boolean;

  @IsString()
  @IsOptional()
  trans_mode: string;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  rating: number;

  @IsString()
  @IsOptional()
  recommendation: string;

  @IsString()
  @IsOptional()
  thumb_url: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  expense: number;

  @IsString()
  @IsOptional()
  note: string;
}
