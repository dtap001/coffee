export class InternalServerError extends Error {
  originalError?: Error;
  guid: string;
  context: string;
  message: string;
  constructor() {
    super();
  }
}
