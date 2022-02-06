import { Module } from '@nestjs/common';
import { BaseController } from './edge/base.controller';
import { DTOFactory } from './edge/dto.factory';
import { GuidService } from './edge/guid.service';
import { ErrorFactory } from './errors/error.factory';
import { StorageService } from './respository/storage.service';
import { CoffeeLogger } from './util/logger';
import { CoffeeSecurity } from './util/security';

@Module({
  providers: [
    CoffeeLogger,
    GuidService,
    StorageService,
    BaseController,
    ErrorFactory,
    CoffeeSecurity,
    DTOFactory,
  ],
  exports: [
    CoffeeLogger,
    GuidService,
    StorageService,
    BaseController,
    ErrorFactory,
    CoffeeSecurity,
    DTOFactory,
  ],
})
export class SharedModule {}
