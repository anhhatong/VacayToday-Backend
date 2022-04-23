import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { Trip } from './entities/trip.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Module({
  controllers: [TripController],
  providers: [TripService, UserService],
  imports: [MikroOrmModule.forFeature({ entities: [Trip, User] })],
  exports: [TripService],
})
export class TripModule {}
