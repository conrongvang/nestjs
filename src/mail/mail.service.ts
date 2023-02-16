import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';

@Injectable()
export class MailService extends BaseService {
  constructor(private mailerService: MailerService) {
    super(MailService.name);
  }
  async sendOtp({ to, otp }) {
    await this.mailerService.sendMail({
      to: to,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'OTP to change password ',
      template: './otp', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        otp: otp,
      },
    });
    return true;
  }
}
