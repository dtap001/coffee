import { BaseError } from './base.error';

export class BackendError extends BaseError {
  constructor(err) {
    super(err);
  }
}
