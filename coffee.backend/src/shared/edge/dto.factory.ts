import { Injectable, Scope } from '@nestjs/common';
import {
  YouFuckedUpResponseDTO,
  WeFuckedUpResponseDTO,
} from './error-response.dto';
import { SessionContextService } from './session-context.service';

@Injectable({ scope: Scope.REQUEST })
export class DTOFactory {
  constructor(private sessionContext: SessionContextService) {}

  youFuckedUpResponse(message: string): YouFuckedUpResponseDTO {
    const result = new YouFuckedUpResponseDTO();
    result.message = message;
    result.guid = this.sessionContext.context.guid;
    return result;
  }

  weFuckedUpResponse(): WeFuckedUpResponseDTO {
    const result = new WeFuckedUpResponseDTO();
    result.message = 'The dog ate our homework.';
    result.guid = this.sessionContext.context.guid;
    return result;
  }
}
