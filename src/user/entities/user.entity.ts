/* eslint-disable @typescript-eslint/naming-convention */
import { Property, Entity, Unique, PrimaryKey } from '@mikro-orm/core';

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

  constructor(username: string, password: string, profile_image: string) {
    this.username = username;
    this.password = password;
    this.profile_image = profile_image;
  }
}
