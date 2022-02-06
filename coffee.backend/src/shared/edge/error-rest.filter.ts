import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { BusinessError } from '../errors/business.error';
import { InternalServerError } from '../errors/internal-server.error';
import { CoffeeLogger } from '../util/logger';
import { DTOFactory } from './dto.factory';
import { GuidService } from './guid.service';

@Catch(Error)
export class ErrorFilterREST implements ExceptionFilter {
  private readonly log = new CoffeeLogger(
    ErrorFilterREST.name,
    this.guid.value,
  );

  constructor(private guid: GuidService, private dtoFactory: DTOFactory) {}

  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let err;
    switch (error.constructor) {
      case BadRequestException:
        err = error as BadRequestException;
        this.log.business(request.url, err.response.message);
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json(
            this.dtoFactory.youFuckedUpResponse(
              `${err.message} ${err.response.message}`,
            ),
          );
      case BusinessError:
        err = error as BusinessError;
        this.log.business(err.context, err.message);
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json(this.dtoFactory.youFuckedUpResponse(error.message));
      case InternalServerError:
        err = error as InternalServerError;
        this.log.error(err.message, err.stack, err.context);
        return response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(this.dtoFactory.weFuckedUpResponse());
      default:
        this.log.errorFromObject(error);
        return response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(this.dtoFactory.weFuckedUpResponse());
    }
  }
}
