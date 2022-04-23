/**
 * File that handles all the APIs related to user, particularly
 * receiving requests and sending responses to client
 */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { CreateTripDto } from './dtos/create-trip.dto';
import { TripService } from './trip.service';
import { Trip } from './entities/trip.entity';
import { Loaded } from '@mikro-orm/core';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOkResponse({ status: 201, type: Trip })
  async create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    // call the database to perform CRUD
    return await this.tripService.create(createTripDto);
  }

  @Get(':userId')
  @ApiOkResponse({ status: 200, type: [Trip] })
  async getTripsByUserId(
    @Param('userId') userId: number,
  ): Promise<Loaded<Trip, 'users'>[]> {
    return await this.tripService.getTripsByUserId(userId);
  }
}
