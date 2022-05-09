import { Migration } from '@mikro-orm/migrations';

export class Migration20220509022321 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "trip" alter column "start_on" type timestamptz(0) using ("start_on"::timestamptz(0));');
    this.addSql('alter table "trip" alter column "start_on" drop not null;');
    this.addSql('alter table "trip" alter column "end_on" type timestamptz(0) using ("end_on"::timestamptz(0));');
    this.addSql('alter table "trip" alter column "end_on" drop not null;');
    this.addSql('alter table "trip" alter column "num_people" type int using ("num_people"::int);');
    this.addSql('alter table "trip" alter column "num_people" set not null;');
    this.addSql('alter table "trip" alter column "likes" type int using ("likes"::int);');
    this.addSql('alter table "trip" alter column "likes" set not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "trip" alter column "start_on" type timestamptz(0) using ("start_on"::timestamptz(0));');
    this.addSql('alter table "trip" alter column "start_on" set not null;');
    this.addSql('alter table "trip" alter column "end_on" type timestamptz(0) using ("end_on"::timestamptz(0));');
    this.addSql('alter table "trip" alter column "end_on" set not null;');
    this.addSql('alter table "trip" alter column "num_people" type int using ("num_people"::int);');
    this.addSql('alter table "trip" alter column "num_people" drop not null;');
    this.addSql('alter table "trip" alter column "likes" type int using ("likes"::int);');
    this.addSql('alter table "trip" alter column "likes" drop not null;');
  }

}
