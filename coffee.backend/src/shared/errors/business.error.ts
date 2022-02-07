import { SessionContext } from '../session-context';

export class BusinessError extends Error {
  context: SessionContext;
  origin: string;
  message: string;
  constructor() {
    super();
  }
}
