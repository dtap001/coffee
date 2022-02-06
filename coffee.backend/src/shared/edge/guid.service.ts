import { Injectable } from '@nestjs/common';
import { CoffeeSecurity } from '../util/security';

@Injectable()
export class GuidService {
  private _uuid: string;

  public get value(): string {
    return this._uuid;
  }
  constructor() {
    this._uuid = CoffeeSecurity.generateUUID();
  }
}
