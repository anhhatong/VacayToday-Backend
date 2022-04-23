/* eslint-disable @typescript-eslint/naming-convention */
import {
  Property,
  Entity,
  Unique,
  PrimaryKey,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Trip } from '../../trip/entities/trip.entity';

@Entity()
export class User {
  @PrimaryKey()
  user_id!: number;

  @Property()
  @Unique()
  username: string;

  @Property()
  password: string;

  @Property({ nullable: true })
  profile_image?: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @ManyToMany(() => Trip, 'users', { owner: true })
  trips = new Collection<Trip>(this);

  constructor(username: string, password: string, profile_image: string) {
    this.username = username;
    this.password = password;
    this.profile_image = profile_image;
  }
}
