import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [MikroOrmModule.forRoot(), UserModule, AuthModule, TripModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
