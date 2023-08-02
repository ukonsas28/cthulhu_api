import { Injectable } from '@nestjs/common';
import { ServerResponse, IncomingMessage } from 'http';
import { pino } from 'pino';
import pinoHttpLogger from 'pino-http';

@Injectable()
export class LoggerService {
  private pinoLogger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        singleLine: true,
      },
    },
  });
  private logger = pinoHttpLogger({
    logger: this.pinoLogger,
  });

  log(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    this.logger(req, res);
  }
}
