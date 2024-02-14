import { UseFilters } from '@nestjs/common';
import { ErrorFilterREST } from './error-rest.filter';

@UseFilters(ErrorFilterREST)
export class BaseController {}
