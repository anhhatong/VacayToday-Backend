import { Migration } from '@mikro-orm/migrations';

export class Migration20220424022053 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "trip" alter column "description" type varchar(255) using ("description"::varchar(255));');
    this.addSql('alter table "trip" alter column "description" drop not null;');
    this.addSql('alter table "trip" alter column "num_people" type int using ("num_people"::int);');
    this.addSql('alter table "trip" alter column "num_people" drop not null;');
    this.addSql('alter table "trip" alter column "likes" type int using ("likes"::int);');
    this.addSql('alter table "trip" alter column "likes" drop not null;');
    this.addSql('alter table "trip" alter column "thumb_url" type varchar(255) using ("thumb_url"::varchar(255));');
    this.addSql('alter table "trip" alter column "thumb_url" drop not null;');

    this.addSql('alter table "activity" alter column "act_description" type varchar(255) using ("act_description"::varchar(255));');
    this.addSql('alter table "activity" alter column "act_description" drop not null;');
    this.addSql('alter table "activity" alter column "location_name" type varchar(255) using ("location_name"::varchar(255));');
    this.addSql('alter table "activity" alter column "location_name" drop not null;');
    this.addSql('alter table "activity" alter column "location_address" type varchar(255) using ("location_address"::varchar(255));');
    this.addSql('alter table "activity" alter column "location_address" drop not null;');
    this.addSql('alter table "activity" alter column "location_contact" type varchar(255) using ("location_contact"::varchar(255));');
    this.addSql('alter table "activity" alter column "location_contact" drop not null;');
    this.addSql('alter table "activity" alter column "is_booked" type boolean using ("is_booked"::boolean);');
    this.addSql('alter table "activity" alter column "is_booked" drop not null;');
    this.addSql('alter table "activity" alter column "trans_mode" type varchar(255) using ("trans_mode"::varchar(255));');
    this.addSql('alter table "activity" alter column "trans_mode" drop not null;');
    this.addSql('alter table "activity" alter column "rating" type int using ("rating"::int);');
    this.addSql('alter table "activity" alter column "rating" drop not null;');
    this.addSql('alter table "activity" alter column "recommendation" type varchar(255) using ("recommendation"::varchar(255));');
    this.addSql('alter table "activity" alter column "recommendation" drop not null;');
    this.addSql('alter table "activity" alter column "thumb_url" type varchar(255) using ("thumb_url"::varchar(255));');
    this.addSql('alter table "activity" alter column "thumb_url" drop not null;');
    this.addSql('alter table "activity" alter column "url" type varchar(255) using ("url"::varchar(255));');
    this.addSql('alter table "activity" alter column "url" drop not null;');
    this.addSql('alter table "activity" alter column "note" type varchar(255) using ("note"::varchar(255));');
    this.addSql('alter table "activity" alter column "note" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "trip" alter column "description" type varchar(255) using ("description"::varchar(255));');
    this.addSql('alter table "trip" alter column "description" set not null;');
    this.addSql('alter table "trip" alter column "num_people" type int using ("num_people"::int);');
    this.addSql('alter table "trip" alter column "num_people" set not null;');
    this.addSql('alter table "trip" alter column "likes" type int using ("likes"::int);');
    this.addSql('alter table "trip" alter column "likes" set not null;');
    this.addSql('alter table "trip" alter column "thumb_url" type varchar(255) using ("thumb_url"::varchar(255));');
    this.addSql('alter table "trip" alter column "thumb_url" set not null;');

    this.addSql('alter table "activity" alter column "act_description" type varchar(255) using ("act_description"::varchar(255));');
    this.addSql('alter table "activity" alter column "act_description" set not null;');
    this.addSql('alter table "activity" alter column "location_name" type varchar(255) using ("location_name"::varchar(255));');
    this.addSql('alter table "activity" alter column "location_name" set not null;');
    this.addSql('alter table "activity" alter column "location_address" type varchar(255) using ("location_address"::varchar(255));');
    this.addSql('alter table "activity" alter column "location_address" set not null;');
    this.addSql('alter table "activity" alter column "location_contact" type varchar(255) using ("location_contact"::varchar(255));');
    this.addSql('alter table "activity" alter column "location_contact" set not null;');
    this.addSql('alter table "activity" alter column "is_booked" type boolean using ("is_booked"::boolean);');
    this.addSql('alter table "activity" alter column "is_booked" set not null;');
    this.addSql('alter table "activity" alter column "trans_mode" type varchar(255) using ("trans_mode"::varchar(255));');
    this.addSql('alter table "activity" alter column "trans_mode" set not null;');
    this.addSql('alter table "activity" alter column "rating" type int using ("rating"::int);');
    this.addSql('alter table "activity" alter column "rating" set not null;');
    this.addSql('alter table "activity" alter column "recommendation" type varchar(255) using ("recommendation"::varchar(255));');
    this.addSql('alter table "activity" alter column "recommendation" set not null;');
    this.addSql('alter table "activity" alter column "thumb_url" type varchar(255) using ("thumb_url"::varchar(255));');
    this.addSql('alter table "activity" alter column "thumb_url" set not null;');
    this.addSql('alter table "activity" alter column "url" type varchar(255) using ("url"::varchar(255));');
    this.addSql('alter table "activity" alter column "url" set not null;');
    this.addSql('alter table "activity" alter column "note" type varchar(255) using ("note"::varchar(255));');
    this.addSql('alter table "activity" alter column "note" set not null;');
  }

}
