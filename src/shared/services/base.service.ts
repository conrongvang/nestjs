import { Logger } from '@nestjs/common';

export class BaseService {
  private readonly logger: Logger = null;

  constructor(loggerName: string) {
    this.logger = new Logger(loggerName);
  }
}
