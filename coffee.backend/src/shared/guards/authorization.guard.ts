import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Scope,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleBO } from 'src/user/business/bos/role.bo';
import { SessionContextService } from '../edge/session-context.service';
import { PUBLIC_METADATAKEY } from './public.guard';
import { ROLES_METADATA_KEY } from './role-decorator.guard';

@Injectable({ scope: Scope.REQUEST })
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private sessionContext: SessionContextService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    debugger;
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.get<string[]>(
      PUBLIC_METADATAKEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.get<string[]>(
      ROLES_METADATA_KEY,
      context.getHandler(),
    );
    if (!request.user) {
      throw new UnauthorizedException();
    }
    const currentUserRoles = request.user.roles.map(
      (role: RoleBO) => role.caption,
    );
    for (const key in requiredRoles) {
      if (!currentUserRoles.includes(requiredRoles[key])) {
        return false;
      }
    }
   this.sessionContext.setUser(request.user);
    return true;
  }
}
