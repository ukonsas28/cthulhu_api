import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { IncomingMessage, ServerResponse } from 'http';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}
  use(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    next: () => void,
  ) {
    this.loggerService.log(req, res);
    next();
  }
}
