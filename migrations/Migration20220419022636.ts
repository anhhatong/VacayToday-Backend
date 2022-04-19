import { Migration } from '@mikro-orm/migrations';

export class Migration20220419022636 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("user_id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null, "profile_image" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

}
