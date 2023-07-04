import { Injectable } from '@nestjs/common';
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

  log(req: any, res: any) {
    this.logger(req, res);
  }
}
