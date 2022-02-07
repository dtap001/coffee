import { Injectable, Scope } from '@nestjs/common';
import { SessionContext } from '../session-context';

import { CoffeeSecurity } from '../util/security';

@Injectable({ scope: Scope.REQUEST })
export class SessionContextService {
  private _context: SessionContext;
  public get context(): SessionContext {
    return this._context;
  }
  constructor(private security: CoffeeSecurity) {
    this._context = new SessionContext();
    this._context.guid = this.security.generateUUID();
  }
}
