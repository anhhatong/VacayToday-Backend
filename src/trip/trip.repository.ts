/**
 * File that create an entity in the model
 */
import { EntityRepository, Entity } from '@mikro-orm/core';
import { Activity } from './entities/activity.entity';
import { Category } from './entities/category.entity';
import { Trip } from './entities/trip.entity';

@Entity({ customRepository: () => Trip })
export class TripRepository extends EntityRepository<Trip> {}
export class ActivityRepository extends EntityRepository<Activity> {}
export class CategoryRepository extends EntityRepository<Category> {}
