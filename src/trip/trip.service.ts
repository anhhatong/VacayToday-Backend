/**
 * File that handles all the business logic related to user by
 * doing database calls using ORM
 * Services are also known as Providers
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';

import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dtos/create-trip.dto';
import { TripRepository } from './trip.repository';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/entities/user.entity';
import { Loaded } from '@mikro-orm/core';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: TripRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    const user: User = await this.userRepository.findOne({
      user_id: createTripDto.created_by,
    });
    const trip = new Trip(
      createTripDto.name,
      createTripDto.description,
      createTripDto.start_on,
      createTripDto.end_on,
      createTripDto.num_people,
      createTripDto.likes,
      createTripDto.is_published,
      user,
      createTripDto.thumb_url,
    );
    user.trips.add(trip);
    await this.tripRepository.persistAndFlush(trip);
    return trip;
  }

  async getTripsByUserId(userId: number): Promise<Loaded<Trip, 'users'>[]> {
    // get all trips in user_trip table that has userId
    const trips: Loaded<Trip, 'users'>[] = await this.tripRepository.find(
      {
        users: { user_id: userId },
      },
      {
        fields: [
          'trip_id',
          'name',
          'description',
          'start_on',
          'end_on',
          'num_people',
          'likes',
          'thumb_url',
          { users: ['username', 'profile_image'] },
        ],
      },
    );
    return trips;
  }

  async getExploreTrips(): Promise<Loaded<Trip, 'users'>[]> {
    const trips: Loaded<Trip, 'users'>[] = await this.tripRepository.find(
      {
        is_published: true,
      },
      {
        fields: [
          'trip_id',
          'name',
          'description',
          'start_on',
          'end_on',
          'num_people',
          'likes',
          'thumb_url',
          { users: ['username', 'profile_image'] },
        ],
      },
    );
    return trips;
  }
}
