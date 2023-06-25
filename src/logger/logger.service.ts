import { Injectable } from '@nestjs/common';
import { pino } from 'pino';

@Injectable()
export class LoggerService {
  private pinoLogger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  });

  info(req: Request, res: Response) {
    this.pinoLogger.info(req);
    this.pinoLogger.info(res);
  }
}
