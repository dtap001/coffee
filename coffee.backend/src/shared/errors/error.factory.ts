import { Injectable } from '@nestjs/common';
import { GuidService } from '../edge/guid.service';
import { BusinessError } from './business.error';
import { InternalServerError } from './internal-server.error';
@Injectable()
export class ErrorFactory {
  constructor(private guid: GuidService) {}

  business(context: string, msg: string) {
    const err = new BusinessError();
    err.context = context;
    err.guid = this.guid.value;
    err.message = msg;

    return err;
  }

  internalServerError(
    context: string,
    msg: string,
    originalError?: Error,
  ): InternalServerError {
    const err = new InternalServerError();
    err.originalError = originalError;
    err.message = msg;
    err.guid = this.guid.value;
    err.context = context;

    return err;
  }
}
