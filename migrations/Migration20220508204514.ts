import { Migration } from '@mikro-orm/migrations';

export class Migration20220508204514 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "activity" add column "location_to" varchar(255) null, add column "expense" int null;');
  }

}
