import { Module } from '@nestjs/common';
import { GuidService } from './edge/guid.service';
import { StorageService } from './respository/storage.service';
import { CoffeeLogger } from './util/logger';

@Module({
  providers: [CoffeeLogger, GuidService, StorageService],
  exports: [CoffeeLogger, GuidService, StorageService],
})
export class SharedModule {}
