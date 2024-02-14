import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Scope,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IncomingMessage } from 'http';
import { UserRepository } from 'src/user/repository/user.repository';
import { CoffeeSecurity } from '../util/security';
import { PUBLIC_METADATAKEY } from './public.guard';

@Injectable({ scope: Scope.REQUEST })
export class AuthenticationGuard implements CanActivate {
  constructor(
    private security: CoffeeSecurity,
    private userRepository: UserRepository,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<string[]>(
      PUBLIC_METADATAKEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const token = this.getToken(request);

    const result = this.security.decodeJWT(token);
    if (!result.isValid) {
      return false;
    }
    const foundUser = await this.userRepository
      .getUserByGuid(result.user.guid)
      .catch(err => {
        throw new UnauthorizedException();
      });
    request.user = foundUser;
    return true;
  }

  private getToken(request: IncomingMessage) {
    const tokenIndex = request.rawHeaders.indexOf('Authorization');
    if (tokenIndex == -1) {
      throw new UnauthorizedException('Missing Authorization token content');
    }
    return request.rawHeaders[tokenIndex + 1].replace('Bearer ', '');
  }
}
