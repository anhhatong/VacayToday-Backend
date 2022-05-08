/* eslint-disable @typescript-eslint/naming-convention */
import { Property, Entity, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { Category } from './category.entity';
import { Trip } from './trip.entity';

@Entity()
export class Activity {
  @PrimaryKey()
  act_id!: number;

  @ManyToOne()
  trip!: Trip;

  @ManyToOne()
  category!: Category;

  @Property()
  act_title: string;

  @Property({ nullable: true })
  act_description: string;

  @Property({ nullable: true })
  location_name: string;

  @Property({ nullable: true })
  location_address: string;

  @Property({ nullable: true })
  location_contact: string;

  @Property({ nullable: true })
  location_to: string;

  @Property()
  act_from: Date;

  @Property()
  act_to: Date;

  @Property({ nullable: true })
  is_booked: boolean;

  @Property({ nullable: true })
  trans_mode: string;

  @Property({ nullable: true })
  rating: number;

  @Property({ nullable: true })
  recommendation: string;

  @Property({ nullable: true })
  thumb_url: string;

  @Property({ nullable: true })
  expense: number;

  @Property({ nullable: true })
  url: string;

  @Property({ nullable: true })
  note: string;

  constructor(
    act_title: string,
    act_description: string,
    location_name: string,
    location_address: string,
    location_contact: string,
    location_to: string,
    act_from: string,
    act_to: string,
    is_booked: boolean,
    trans_mode: string,
    rating: number,
    recommendation: string,
    thumb_url: string,
    url: string,
    expense: number,
    note: string,
  ) {
    this.act_title = act_title;
    this.act_description = act_description;
    this.location_name = location_name;
    this.location_address = location_address;
    this.location_contact = location_contact;
    this.location_to = location_to;
    this.act_from = new Date(act_from);
    this.act_to = new Date(act_to);
    this.is_booked = is_booked;
    this.trans_mode = trans_mode;
    this.rating = rating;
    this.recommendation = recommendation;
    this.thumb_url = thumb_url;
    this.url = url;
    this.expense = expense;
    this.note = note;
  }
}
