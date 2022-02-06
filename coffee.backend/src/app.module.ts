import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [UserModule, SharedModule],
})
export class AppModule {}
