import { Module } from '@nestjs/common';
import { BaseController } from './edge/base.controller';
import { SessionContextService } from './edge/session-context.service';
import { StorageService } from './respository/storage.service';
import { CoffeeLogger, SystemLogger } from './util/logger';
import { CoffeeSecurity } from './util/security';

@Module({
  providers: [
    SystemLogger,
    CoffeeLogger,
    SessionContextService,
    StorageService,
    BaseController,
    CoffeeSecurity,
  ],
  exports: [
    SystemLogger,
    CoffeeLogger,
    SessionContextService,
    StorageService,
    BaseController,
    CoffeeSecurity,
  ],
})
export class SharedModule {}
