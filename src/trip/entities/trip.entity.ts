/* eslint-disable @typescript-eslint/naming-convention */
import {
  Property,
  Entity,
  PrimaryKey,
  ManyToMany,
  Collection,
  OneToMany,
} from '@mikro-orm/core';
import { User } from '../../user/entities/user.entity';
import { Activity } from './activity.entity';

@Entity()
export class Trip {
  @PrimaryKey()
  trip_id!: number;

  @Property()
  name: string;

  @Property({ nullable: true })
  description: string;

  @Property({ nullable: true })
  start_on: Date;

  @Property({ nullable: true })
  end_on: Date;

  @Property()
  num_people: number;

  @Property()
  likes: number;

  @Property()
  is_published: boolean;

  @Property()
  created_on = new Date();

  @Property({ nullable: true })
  thumb_url: string;

  @ManyToMany(() => User, (user) => user.trips)
  users = new Collection<User>(this);

  @OneToMany(() => Activity, (activity) => activity.trip)
  activities = new Collection<Activity>(this);

  constructor(
    name: string,
    description: string,
    num_people: number,
    likes: number,
    is_published: boolean,
    creator: User,
    thumb_url: string,
  ) {
    this.name = name;
    this.description = description;
    this.start_on = null;
    this.end_on = null;
    this.num_people = num_people;
    this.likes = likes;
    this.is_published = is_published;
    this.users.add(creator);
    this.thumb_url = thumb_url;
  }
}
