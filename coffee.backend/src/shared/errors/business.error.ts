export class BusinessError extends Error {
  guid: string;
  context: string;
  message: string;
  constructor() {
    super();
  }
}
