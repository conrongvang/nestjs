import { forwardRef, Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AuthModule } from '../shared/services/auth/auth.module';
import { DatabaseModule } from '../shared/database/database.module';
import { MailModule } from 'src/mail/mail.module';
import { ResetPasswordService } from './resetPassword.service';

@Module({
  imports: [forwardRef(() => AuthModule), DatabaseModule, MailModule],
  controllers: [AccountController],
  providers: [AccountService, ResetPasswordService],
  exports: [AccountService, ResetPasswordService],
})
export class AccountModule {}
