import { ConsoleLogger } from '@nestjs/common';
import { SessionContext } from '../session-context';
import { ValueString } from './value-type';

export class SystemLogger extends ConsoleLogger {
  constructor(context: string) {
    super(context);
  }
  error(message: any, stack?: string, context?: string) {
    if (message && stack && context) {
      super.error(`${message}`, stack, context);
      return;
    }

    if (message && stack) {
      super.error(`${message}`, stack);
      return;
    }

    super.error(`${message}`);
  }

  info(message: any) {
    super.log(`${message}`);
  }

  debug(message: any) {
    super.debug(`${message}`);
  }
}

export class CoffeeLogger {
  private logger: SystemLogger;
  constructor(callerClass: string) {
    this.logger = new SystemLogger(callerClass);
  }

  errorFromObject(err: Error, origin: string, context?: SessionContext) {
    this.errorFromObject.caller;
    this.logger.error(
      this.buildLogMsg(err.message, origin, 'CRITICAL', context),
      err.stack,
    );
  }

  error(message: LogMessage, origin: LogOrigin, context?: SessionContext) {
    this.logger.error(
      this.buildLogMsg(message.value, origin.value, null, context),
    );
  }

  info(message: LogMessage, origin: LogOrigin, context?: SessionContext) {
    this.logger.log(
      this.buildLogMsg(message.value, origin.value, null, context),
    );
  }

  debug(message: LogMessage, origin: LogOrigin, context?: SessionContext) {
    this.logger.debug(
      this.buildLogMsg(message.value, origin.value, null, context),
    );
  }

  business(message: LogMessage, origin: LogOrigin, context?: SessionContext) {
    this.logger.log(
      this.buildLogMsg(message.value, origin.value, 'BUSINESS', context),
    );
  }

  private buildLogMsg(
    message: string,
    origin: string,
    label: string,
    context?: SessionContext,
  ) {
    return `${this.getLogPart(origin)}${this.getContextInfo(
      context,
    )}${this.getLogPart(label)}${this.getLogPart(message)}`;
  }

  private getLogPart(part: string) {
    if (part) {
      return `[${part}]`;
    }
    return '';
  }

  private getContextInfo(sessionContext?: SessionContext) {
    if (sessionContext?.guid) {
      return `${this.getLogPart(sessionContext.guid)}`;
    }
    return ``;
  }
}

export class LogMessage extends ValueString {
  constructor(value) {
    super(value);
  }
}
export class LogOrigin extends ValueString {
  constructor(value) {
    super(value);
  }
}
