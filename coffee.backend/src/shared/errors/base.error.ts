export class BaseError extends Error {
  guid: string;
  constructor(msg) {
    super(msg);
  }
}
