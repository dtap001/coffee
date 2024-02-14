import { Injectable, Req, Scope } from '@nestjs/common';
import { UserBO } from 'src/user/business/bos/user.bo';
import { ErrorMessage, ErrorOrigin } from '../errors/base.error';
import { ErrorFactory } from '../errors/error.factory';
import { SessionContext } from '../session-context';

import { CoffeeSecurity } from '../util/security';

@Injectable({ scope: Scope.REQUEST })
export class SessionContextService {
  private _context: SessionContext;
  private _isSealed: boolean;
  public get context(): SessionContext {
    return this._context;
  }
  constructor(private security: CoffeeSecurity) {
    this._context = new SessionContext();
    this._context.guid = this.security.generateUUID();
  }
  public setUser(user: UserBO) {
    if (this._isSealed) {
      ErrorFactory.internalServerError(
        new ErrorMessage('User already set to session context'),
        new ErrorOrigin(this.setUser.name),
      );
    }
    this._isSealed = true;
    this._context.user = user;
  }
}
