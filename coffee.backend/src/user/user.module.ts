import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserService } from './business/user.service';
import { UserController } from './edge/rest/user.controller';
import { UserGateway } from './edge/socket/user.gateway';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [SharedModule],
  providers: [UserGateway, UserController, UserRepository, UserService],
})
export class UserModule {}
