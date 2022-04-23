/* eslint-disable @typescript-eslint/naming-convention */
import {
  Property,
  Entity,
  PrimaryKey,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Trip {
  @PrimaryKey()
  trip_id!: number;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property()
  start_on: Date;

  @Property()
  end_on: Date;

  @Property()
  num_people: number;

  @Property()
  likes: number;

  @Property()
  is_published: boolean;

  @Property()
  created_on = new Date();

  // TODO: TRIP_ZIP reference

  @Property()
  thumb_url: string;

  @ManyToMany(() => User, (user) => user.trips)
  users = new Collection<User>(this);

  constructor(
    name: string,
    description: string,
    start_on: string,
    end_on: string,
    num_people: number,
    likes: number,
    is_published: boolean,
    creator: User,
    thumb_url: string,
  ) {
    this.name = name;
    this.description = description;
    this.start_on = new Date(start_on);
    this.end_on = new Date(end_on);
    this.num_people = num_people;
    this.likes = likes;
    this.is_published = is_published;
    this.users.add(creator);
    this.thumb_url = thumb_url;
  }
}
