import { Test, TestingModule } from '@nestjs/testing';
import { NetworkGateway } from './network.gateway';
import { NetworkService } from './network.service';

describe('NetworkGateway', () => {
  let gateway: NetworkGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetworkGateway, NetworkService],
    }).compile();

    gateway = module.get<NetworkGateway>(NetworkGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
