import { Logger, LoggerService } from '@nestjs/common';

export class EcommerceLoggerService implements LoggerService {
  private readonly logger;

  constructor() {
    this.logger = new Logger(EcommerceLoggerService.name).localInstance;
  }

  async error(message: any, ...optionalParams: any[]) {
    await this.logger.error(message, optionalParams);
  }

  async log(message: any, ...optionalParams: any[]) {
    await this.logger.log(message, optionalParams);
  }

  async warn(message: any, ...optionalParams: any[]) {
    await this.logger.warn(message, optionalParams);
  }

  async debug(message: any, ...optionalParams) {
    await this.logger.debug(message, optionalParams);
  }

  async verbose(message: any, ...optionalParams) {
    await this.logger.verbose(message, optionalParams);
  }
}
