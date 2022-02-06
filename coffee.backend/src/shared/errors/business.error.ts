import { BaseError } from './base.error';

export class BusinessError extends BaseError {
  constructor(msg: string) {
    super(msg);
  }
}
