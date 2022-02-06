import { Injectable } from '@nestjs/common';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';

@Injectable()
export class NetworkService {
  create(createNetworkDto: CreateNetworkDto) {
    return 'This action adds a new network';
  }

  findAll() {
    return `This action returns all network`;
  }

  findOne(id: number) {
    return `This action returns a #${id} network`;
  }

  update(id: number, updateNetworkDto: UpdateNetworkDto) {
    return `This action updates a #${id} network`;
  }

  remove(id: number) {
    return `This action removes a #${id} network`;
  }
}
