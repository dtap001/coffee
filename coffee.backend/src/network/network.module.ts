import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkGateway } from './network.gateway';

@Module({
  providers: [NetworkGateway, NetworkService]
})
export class NetworkModule {}
