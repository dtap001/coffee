import { Injectable } from '@nestjs/common';
import {
  YouFuckedUpResponseDTO,
  WeFuckedUpResponseDTO,
} from './error-response.dto';
import { GuidService } from './guid.service';

@Injectable()
export class DTOFactory {
  constructor(private guid: GuidService) {}

  youFuckedUpResponse(message: string): YouFuckedUpResponseDTO {
    const result = new YouFuckedUpResponseDTO();
    result.message = message;
    result.guid = this.guid.value;
    return result;
  }

  weFuckedUpResponse(): WeFuckedUpResponseDTO {
    const result = new WeFuckedUpResponseDTO();
    result.message = 'The dog ate our homework.';
    result.guid = this.guid.value;
    return result;
  }
}
