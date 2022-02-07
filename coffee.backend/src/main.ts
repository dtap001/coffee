import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { StorageService } from './shared/respository/storage.service';
import { SystemLogger } from './shared/util/logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const log = new SystemLogger('Main');
  app.useLogger(app.get(SystemLogger));

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
