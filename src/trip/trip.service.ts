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
}
