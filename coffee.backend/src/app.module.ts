import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticationGuard } from './shared/guards/authentication.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from './shared/guards/authorization.guard';

@Module({
  imports: [UserModule, SharedModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}
