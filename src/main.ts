import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // used in all the APIs
  await app.listen(3000); // localhost: 3000
}
bootstrap();
