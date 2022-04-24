import { Migration } from '@mikro-orm/migrations';

export class Migration20220424011854 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category" ("cat_id" serial primary key, "cat" varchar(255) not null);');

    this.addSql('create table "activity" ("act_id" serial primary key, "trip_trip_id" int not null, "category_cat_id" int not null, "act_title" varchar(255) not null, "act_description" varchar(255) not null, "location_name" varchar(255) not null, "location_address" varchar(255) not null, "location_contact" varchar(255) not null, "act_from" timestamptz(0) not null, "act_to" timestamptz(0) not null, "is_booked" boolean not null, "trans_mode" varchar(255) not null, "rating" int not null, "recommendation" varchar(255) not null, "thumb_url" varchar(255) not null, "url" varchar(255) not null, "note" varchar(255) not null);');

    this.addSql('alter table "activity" add constraint "activity_trip_trip_id_foreign" foreign key ("trip_trip_id") references "trip" ("trip_id") on update cascade;');
    this.addSql('alter table "activity" add constraint "activity_category_cat_id_foreign" foreign key ("category_cat_id") references "category" ("cat_id") on update cascade;');
  }

}
