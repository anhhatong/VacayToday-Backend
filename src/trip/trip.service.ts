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
import { Loaded, QueryOrder } from '@mikro-orm/core';
import { Activity } from './entities/activity.entity';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateTripDto } from './dtos/update-trip.dto';

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

  async updateTrip(
    tripId: number,
    updateTripDto: UpdateTripDto,
  ): Promise<Trip> {
    const trip: Trip = await this.tripRepository.findOne({
      trip_id: tripId,
    });
    for (const [key, value] of Object.entries(updateTripDto)) {
      trip[key] = value;
    }
    await this.tripRepository.flush();
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
      createActivityDto.location_to,
      createActivityDto.act_from,
      createActivityDto.act_to,
      createActivityDto.is_booked,
      createActivityDto.trans_mode,
      createActivityDto.rating,
      createActivityDto.recommendation,
      createActivityDto.thumb_url,
      createActivityDto.url,
      createActivityDto.expense,
      createActivityDto.note,
    );
    activity.trip = trip;
    trip.activities.add(activity);
    activity.category = cat;
    cat.activities.add(activity);
    await this.activityRepository.persistAndFlush(activity);

    const actStart = activity.act_from;
    const actEnd = activity.act_to;
    const bodyUpdate = new UpdateTripDto();

    if (
      trip.start_on === null ||
      trip.start_on.getTime() > actStart.getTime()
    ) {
      bodyUpdate['start_on'] = actStart;
    }
    if (trip.start_on === null || trip.start_on.getTime() < actEnd.getTime()) {
      bodyUpdate['end_on'] = actEnd;
    }
    await this.updateTrip(tripId, bodyUpdate);
    return activity;
  }

  async getDatesByTripId(tripId: number): Promise<string[]> {
    const allActivities: Activity[] = await this.activityRepository.find({
      trip: { trip_id: tripId },
    });
    const dateSet = new Set();
    // get unique activity datetimes
    allActivities.map((act: Activity) => {
      const date: Date = new Date(act.act_from);
      dateSet.add(
        date.getUTCFullYear() +
          '-' +
          (date.getUTCMonth() + 1) +
          '-' +
          date.getUTCDate(),
      );
    });
    const dates = [];
    // populate unique datetime strings to array form
    for (const date of dateSet) {
      dates.push(date);
    }
    dates.sort();
    return dates;
  }

  // get activities by tripId and default date
  async getActivitiesByTripId(tripId: number): Promise<Loaded<Activity>[]> {
    let date = new Date();
    // activities after today
    const after = await this.activityRepository.find(
      {
        $and: [{ trip: { trip_id: tripId } }, { act_from: { $gte: date } }],
      },
      { orderBy: { act_from: QueryOrder.ASC } },
    );
    // activities before today
    const before = await this.activityRepository.find(
      {
        $and: [{ trip: { trip_id: tripId } }, { act_from: { $lt: date } }],
      },
      { orderBy: { act_from: QueryOrder.ASC } },
    );

    // trip already done, get the first day of trip
    if (after.length == 0 && before.length > 0) {
      date = before[0].act_from;
    }
    // trip not happened yet, get the first day of trip
    // trip happening, get today or the following closest day
    else if (after.length != 0) {
      date = after[0].act_from;
    }

    return await this.getActivitiesByTripIdAndDate(tripId, date.toJSON());
  }

  // get activities by tripId and specific date
  async getActivitiesByTripIdAndDate(
    tripId: number,
    date: string,
  ): Promise<Loaded<Activity>[]> {
    const curDay = new Date(date);
    curDay.setUTCHours(0, 0, 0, 0);
    const nextDay = new Date(curDay);
    nextDay.setDate(curDay.getDate() + 1);
    /*
     * get activities between the beginning of current day
     * and the beginning of next day
     */
    return await this.activityRepository.find(
      {
        $and: [
          { trip: { trip_id: tripId } },
          { act_from: { $gte: curDay, $lt: nextDay } },
        ],
      },
      { orderBy: { act_from: QueryOrder.ASC } },
    );
  }

  async getActivitiesByCategory(
    tripId: number,
    catId: number,
  ): Promise<Loaded<Activity>[]> {
    return await this.activityRepository.find(
      {
        $and: [
          {
            trip: { trip_id: tripId },
          },
          { category: { cat_id: catId } },
        ],
      },
      { orderBy: { act_from: QueryOrder.ASC } },
    );
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
