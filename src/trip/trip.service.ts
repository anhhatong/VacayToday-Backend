/**
 * File that handles all the business logic related to user by
 * doing database calls using ORM
 * Services are also known as Providers
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';

import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dtos/create-trip.dto';
import { CreateActivityDto } from './dtos/create-activity.dto';
import {
  ActivityRepository,
  TripRepository,
  CategoryRepository,
} from './trip.repository';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/entities/user.entity';
import { Loaded } from '@mikro-orm/core';
import { Activity } from './entities/activity.entity';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: TripRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(Activity)
    private readonly activityRepository: ActivityRepository,
    @InjectRepository(Category)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async createTrip(createTripDto: CreateTripDto): Promise<Trip> {
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

  async createActivity(
    tripId: number,
    catId: number,
    createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    const trip: Trip = await this.tripRepository.findOne({ trip_id: tripId });
    const cat: Category = await this.categoryRepository.findOne({
      cat_id: catId,
    });
    const activity = new Activity(
      createActivityDto.act_title,
      createActivityDto.act_description,
      createActivityDto.location_name,
      createActivityDto.location_address,
      createActivityDto.location_contact,
      createActivityDto.act_from,
      createActivityDto.act_to,
      createActivityDto.is_booked,
      createActivityDto.trans_mode,
      createActivityDto.rating,
      createActivityDto.recommendation,
      createActivityDto.thumb_url,
      createActivityDto.url,
      createActivityDto.note,
    );
    activity.trip = trip;
    trip.activities.add(activity);
    activity.category = cat;
    cat.activities.add(activity);
    await this.activityRepository.persistAndFlush(activity);
    return activity;
  }

  async getActivitiesByTripId(tripId: number): Promise<Loaded<Activity>[]> {
    return await this.activityRepository.find({
      trip: { trip_id: tripId },
    });
  }

  async getActivityByActId(actId: number): Promise<Activity> {
    return await this.activityRepository.findOne(
      {
        act_id: actId,
      },
      { populate: ['category'] },
    );
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = new Category(createCategoryDto.category);
    await this.categoryRepository.persistAndFlush(category);
    return category;
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
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
          'is_published',
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
          'is_published',
          { users: ['username', 'profile_image'] },
        ],
      },
    );
    return trips;
  }
}
