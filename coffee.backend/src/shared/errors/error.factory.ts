import { SessionContext } from '../session-context';
import { ErrorMessage, ErrorOrigin } from './base.error';
import { BusinessError } from './business.error';
import { InternalServerError } from './internal-server.error';

export class ErrorFactory {
  static business(
    msg: ErrorMessage,
    origin: ErrorOrigin,
    context?: SessionContext,
  ) {
    const err = new BusinessError();
    err.origin = origin.value;
    err.context = context;
    err.message = msg.value;

    return err;
  }

  static internalServerError(
    msg: ErrorMessage,
    origin: ErrorOrigin,
    originalError?: Error,
    context?: SessionContext,
  ): InternalServerError {
    const err = new InternalServerError();
    err.originalError = originalError;
    err.message = msg.value;
    err.origin = origin.value;
    err.context = context;
    return err;
  }
}
