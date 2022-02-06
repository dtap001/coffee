import { BaseError } from '../errors/base.error';
import { CoffeeDTO } from './coffe.dto';

export class ErrorResponseDTO extends CoffeeDTO {
  message: any;
  guid: string;
  constructor(error: BaseError) {
    super();
    this.message = error.message;
    this.guid = error.guid;
  }
}
