import { CoffeeDTO } from './coffe.dto';

export class YouFuckedUpResponseDTO extends CoffeeDTO {
  message: any;
  guid: string;
  constructor() {
    super();
  }
}

export class WeFuckedUpResponseDTO extends CoffeeDTO {
  message: any;
  guid: string;
  constructor() {
    super();
  }
}
