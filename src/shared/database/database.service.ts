import { Logger } from '@nestjs/common';

export class DatabaseService {
  protected readonly logger = null;

  constructor(loggerName: string) {
    this.logger = new Logger(loggerName);
  }
}
