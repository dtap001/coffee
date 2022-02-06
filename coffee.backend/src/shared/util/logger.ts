import { ConsoleLogger } from '@nestjs/common';

export class CoffeeLogger extends ConsoleLogger {
  constructor(context: string, private guid: string) {
    super(context);
  }
  error(message: any, stack?: string, context?: string) {
    super.error(`|${this.guid}| ${message}`, stack, context);
  }
  info(message: any, stack?: string, context?: string) {
    super.log(`|${this.guid}| ${message}`, stack, context);
  }
  debug(message: any, stack?: string, context?: string) {
    super.debug(`|${this.guid}| ${message}`, stack, context);
  }
  business(message: any, stack?: string, context?: string) {
    super.log(`AUDIT|${this.guid}| ${message}`, stack, context);
  }
}
