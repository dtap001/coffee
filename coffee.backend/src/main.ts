import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { StorageService } from './shared/respository/storage.service';
import { SystemLogger } from './shared/util/logger';
import { CoffeeSecurity } from './shared/util/security';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const log = new SystemLogger('Main');
  app.useLogger(app.get(SystemLogger));

  const security = app.get(CoffeeSecurity);
  security.init();
  const storage = app.get(StorageService);
  await storage.initialize();
  log.info('Storage init is done');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
try {
  bootstrap();
} catch (err) {
  debugger;
  console.error(`Bootsrapping failed:`, err);
}
