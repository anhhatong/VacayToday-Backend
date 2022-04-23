/**
 * File that create an entity in the model
 */
import { EntityRepository, Entity } from '@mikro-orm/core';
import { Trip } from './entities/trip.entity';

@Entity({ customRepository: () => Trip })
export class TripRepository extends EntityRepository<Trip> {}
