import { ConsoleLogger } from '@nestjs/common';

export class CoffeeLogger extends ConsoleLogger {
  constructor(context: string, private guid: string) {
    super(context);
  }
  errorFromObject(err: Error) {
    this.error(err.message, err.stack);
  }
  error(message: any, stack?: string, context?: string) {
    super.error(`|${this.guid}| ${message}`, stack, context);
  }
  info(message: any) {
    super.log(`|${this.guid}| ${message}`);
  }
  debug(message: any) {
    super.debug(`|${this.guid}| ${message}`);
  }
  business(context: string, message) {
    super.log(`AUDIT|${this.guid}|${context}|${message}`);
  }
}
