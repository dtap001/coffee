import { Module } from '@nestjs/common';
import { SharedModule } from './../shared/shared.module';
import { UserService } from './business/user.service';
import { UserController } from './edge/rest/user.controller';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [SharedModule],
  providers: [UserRepository, UserService],
  controllers: [UserController],
})
export class UserModule {}
