import { Module } from '@nestjs/common';
import { BaseController } from './edge/base.controller';
import { DTOFactory } from './edge/dto.factory';
import { SessionContextService } from './edge/session-context.service';
import { ErrorFactory } from './errors/error.factory';
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
    ErrorFactory,
    CoffeeSecurity,
    DTOFactory,
  ],
  exports: [
    SystemLogger,
    CoffeeLogger,
    SessionContextService,
    StorageService,
    BaseController,
    ErrorFactory,
    CoffeeSecurity,
    DTOFactory,
  ],
})
export class SharedModule {}
