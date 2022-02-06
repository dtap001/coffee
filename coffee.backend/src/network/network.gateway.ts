import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { NetworkService } from './network.service';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';

@WebSocketGateway()
export class NetworkGateway {
  constructor(private readonly networkService: NetworkService) {}

  @SubscribeMessage('createNetwork')
  create(@MessageBody() createNetworkDto: CreateNetworkDto) {
    return this.networkService.create(createNetworkDto);
  }

  @SubscribeMessage('findAllNetwork')
  findAll() {
    return this.networkService.findAll();
  }

  @SubscribeMessage('findOneNetwork')
  findOne(@MessageBody() id: number) {
    return this.networkService.findOne(id);
  }

  @SubscribeMessage('updateNetwork')
  update(@MessageBody() updateNetworkDto: UpdateNetworkDto) {
    return this.networkService.update(updateNetworkDto.id, updateNetworkDto);
  }

  @SubscribeMessage('removeNetwork')
  remove(@MessageBody() id: number) {
    return this.networkService.remove(id);
  }
}
