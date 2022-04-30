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

  @Post('/mytrips/create')
  @ApiOkResponse({ status: 201, type: Trip })
  async createTrip(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    // call the database to perform CRUD
    return await this.tripService.createTrip(createTripDto);
  }

  @Post('/activity/create/:tripId&:catId')
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

  // This must go before getActivitiesByTripId
  @Get('/activities/get/:tripId&:catId')
  @ApiOkResponse({ status: 200, type: [Activity] })
  async getActivitiesByCategory(
    @Param('tripId') tripId: number,
    @Param('catId') catId: number,
  ): Promise<Loaded<Activity>[]> {
    return await this.tripService.getActivitiesByCategory(tripId, catId);
  }

  @Get('/activities/getbydate/:tripId&:date')
  @ApiOkResponse({ status: 200, type: [Activity] })
  async getActivitiesByTripIdAndDate(
    @Param('tripId') tripId: number,
    @Param('date') date: string,
  ): Promise<Loaded<Activity>[]> {
    return await this.tripService.getActivitiesByTripIdAndDate(tripId, date);
  }

  @Get('/activities/get/:tripId')
  @ApiOkResponse({ status: 200, type: [Activity] })
  async getActivitiesByTripId(
    @Param('tripId') tripId: number,
  ): Promise<Loaded<Activity>[]> {
    return await this.tripService.getActivitiesByTripId(tripId);
  }

  @Get('/activities/getdates/:tripId')
  @ApiOkResponse({ status: 200, type: [String] })
  async getDatesByTripId(@Param('tripId') tripId: number): Promise<string[]> {
    return await this.tripService.getDatesByTripId(tripId);
  }

  @Get('/activity/get/:actId')
  @ApiOkResponse({ status: 200, type: Activity })
  async getActivityByActId(@Param('actId') actId: number): Promise<Activity> {
    return await this.tripService.getActivityByActId(actId);
  }

  @Post('/category/create')
  @ApiOkResponse({ status: 201, type: Category })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    // call the database to perform CRUD
    return await this.tripService.createCategory(createCategoryDto);
  }

  @Get('/categories/get')
  @ApiOkResponse({ status: 200, type: [Category] })
  async getCategories(): Promise<Category[]> {
    // call the database to perform CRUD
    return await this.tripService.getCategories();
  }

  @Get('/mytrips/get/:userId')
  @ApiOkResponse({ status: 200, type: [Trip] })
  async getTripsByUserId(
    @Param('userId') userId: number,
  ): Promise<Loaded<Trip, 'users'>[]> {
    return await this.tripService.getTripsByUserId(userId);
  }

  @Get('explores/get')
  @ApiOkResponse({ status: 200, type: [Trip] })
  async getExploreTrips(): Promise<Loaded<Trip, 'users'>[]> {
    return await this.tripService.getExploreTrips();
  }
}
