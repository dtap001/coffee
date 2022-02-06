import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { StorageService } from './shared/respository/storage.service';
import { CoffeeLogger } from './shared/util/logger';

async function bootstrap() {
  console.log("HELLO");
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(CoffeeLogger));
  const storage = app.get(StorageService);
  await storage.initialize();
  await app.listen(3000);
}
bootstrap();
