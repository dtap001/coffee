import uuidGen = require('uuid');
import { Injectable, Scope } from '@nestjs/common';

//@Injectable({ scope: Scope.TRANSIENT })
@Injectable()
export class GuidService {
  private _uuid: string;
  public get value(): string {
    return this._uuid;
  }
  constructor() {
    this._uuid = this.generateUUID();
  }

  generateUUID() {
    return uuidGen.v4();
  }
}
