/**
 * File that handles all the APIs related to user, particularly
 * receiving requests and sending responses to client
 */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { CreateTripDto } from './dtos/create-trip.dto';
import { CreateActivityDto } from './dtos/create-activity.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { TripService } from './trip.service';
import { Trip } from './entities/trip.entity';
import { Loaded } from '@mikro-orm/core';
import { Activity } from './entities/activity.entity';
import { Category } from './entities/category.entity';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOkResponse({ status: 201, type: Trip })
  async createTrip(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    // call the database to perform CRUD
    return await this.tripService.createTrip(createTripDto);
  }

  @Post('/activity/:tripId&:catId')
  @ApiOkResponse({ status: 201, type: Activity })
  async createActivity(
    @Param('tripId') tripId: number,
    @Param('catId') catId: number,
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    // call the database to perform CRUD
    return await this.tripService.createActivity(
      tripId,
      catId,
      createActivityDto,
    );
  }

  @Get('/activity/:tripId')
  @ApiOkResponse({ status: 200, type: [Activity] })
  async getActivitiesByTripId(
    @Param('tripId') tripId: number,
  ): Promise<Loaded<Activity>[]> {
    return await this.tripService.getActivitiesByTripId(tripId);
  }

  @Post('/category')
  @ApiOkResponse({ status: 201, type: Category })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    // call the database to perform CRUD
    return await this.tripService.createCategory(createCategoryDto);
  }

  @Get('/category')
  @ApiOkResponse({ status: 200, type: [Category] })
  async getCategories(): Promise<Category[]> {
    // call the database to perform CRUD
    return await this.tripService.getCategories();
  }

  @Get(':userId')
  @ApiOkResponse({ status: 200, type: [Trip] })
  async getTripsByUserId(
    @Param('userId') userId: number,
  ): Promise<Loaded<Trip, 'users'>[]> {
    return await this.tripService.getTripsByUserId(userId);
  }

  @Get()
  @ApiOkResponse({ status: 200, type: [Trip] })
  async getExploreTrips(): Promise<Loaded<Trip, 'users'>[]> {
    return await this.tripService.getExploreTrips();
  }
}
