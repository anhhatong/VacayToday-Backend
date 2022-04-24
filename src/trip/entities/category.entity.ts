/* eslint-disable @typescript-eslint/naming-convention */
import {
  Property,
  Entity,
  PrimaryKey,
  Collection,
  OneToMany,
} from '@mikro-orm/core';
import { Activity } from './activity.entity';

@Entity()
export class Category {
  @PrimaryKey()
  cat_id!: number;

  @Property()
  cat: string;

  @OneToMany(() => Activity, (activity) => activity.category)
  activities = new Collection<Activity>(this);

  constructor(cat: string) {
    this.cat = cat;
  }
}
