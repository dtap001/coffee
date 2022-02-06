import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { GuidService } from './shared/edge/guid.service';
import { StorageService } from './shared/respository/storage.service';
import { CoffeeLogger } from './shared/util/logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const guid = app.get(GuidService);
  const log = new CoffeeLogger('Main', guid.value);
  app.useLogger(app.get(CoffeeLogger));

  const storage = app.get(StorageService);
  await storage.initialize();
  log.info('Storage init is done');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
try {
  bootstrap();
} catch (err) {
  console.error(`Bootsrapping failed:`, err);
}
