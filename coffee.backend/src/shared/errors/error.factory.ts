import { GuidService } from '../edge/guid.service';
import { BusinessError } from './business.error';

export class ErrorFactory {
  constructor(private guid: GuidService) {}

  business(msg) {
    const err = new BusinessError(msg);
    err.guid = this.guid.value;
    return err;
  }
}
