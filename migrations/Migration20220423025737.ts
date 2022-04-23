import { Migration } from '@mikro-orm/migrations';

export class Migration20220423025737 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "trip" ("trip_id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "start_on" timestamptz(0) not null, "end_on" timestamptz(0) not null, "num_people" int not null, "likes" int not null, "is_published" boolean not null, "created_on" timestamptz(0) not null, "thumb_url" varchar(255) not null);');

    this.addSql('create table "user_trips" ("user_user_id" int not null, "trip_trip_id" int not null);');
    this.addSql('alter table "user_trips" add constraint "user_trips_pkey" primary key ("user_user_id", "trip_trip_id");');

    this.addSql('alter table "user_trips" add constraint "user_trips_user_user_id_foreign" foreign key ("user_user_id") references "user" ("user_id") on update cascade on delete cascade;');
    this.addSql('alter table "user_trips" add constraint "user_trips_trip_trip_id_foreign" foreign key ("trip_trip_id") references "trip" ("trip_id") on update cascade on delete cascade;');
  }

}
