import { SessionContext } from '../session-context';

export class InternalServerError extends Error {
  originalError?: Error;
  origin: string;
  context: SessionContext;
  message: string;
  constructor() {
    super();
  }
}
