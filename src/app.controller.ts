import { MailService } from './mail/mail.service';
import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Public } from './shared/services/auth/decorator/public.decorator';
import * as fs from 'fs';
import { AppConfigs } from './app.config';

@Controller()
@ApiTags('Shared APIs')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly health: HealthCheckService,
    private readonly mailService: MailService,
    private readonly http: HttpHealthIndicator,
    private readonly dbHc: TypeOrmHealthIndicator, // private readonly database: DatabaseService,
  ) {}

  @Public()
  @Get('/postman')
  @ApiOkResponse({ description: 'Generated OpenAPI in JSON format successful' })
  @ApiOperation({ summary: 'Return json data uses to import to Postman app' })
  async getPostmanApiCollection() {
    return JSON.parse(fs.readFileSync('./swagger-doc.json', { encoding: 'utf-8' }));
  }

  @Public()
  @Get(['/hc'])
  @HealthCheck()
  @ApiOkResponse()
  @ApiOperation({ summary: 'Check all services are up or down' })
  async check() {
    this.logger.log(`Checking current status of all services`);
    this.logger.log(JSON.stringify(AppConfigs.db));

    return this.health.check([async () => await this.dbHc.pingCheck('Database')]);
  }

  @Public()
  @Get(['/test-email'])
  @ApiOkResponse()
  @ApiOperation({ summary: 'Check all services are up or down' })
  async sendEmail() {
    await this.mailService.sendOtp({
      to: 'hoangvansang846@gmail.com',
      otp: 123456,
    });
  }
}
