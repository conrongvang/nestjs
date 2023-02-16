import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import * as speakeasy from 'speakeasy';
import { BaseService } from '../shared/services/base.service';
import { ResetPasswordTokenEntity } from './../shared/database/entities/resetPasswordToken.entity';
import { ResetPasswordDbService } from './../shared/database/resetPassword-database.service';

@Injectable()
export class ResetPasswordService extends BaseService {
  constructor(private resetPasswordDbService: ResetPasswordDbService) {
    super(ResetPasswordService.name);
  }

  async generateToken(userId: string): Promise<string> {
    const secret = speakeasy.generateSecret({ length: 20 });
    // expire in 10 minutes
    const expireTime = new Date(new Date().getTime() + 10 * 60000);
    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
      window: 5,
      digits: 4,
    });

    const ent = plainToClass(ResetPasswordTokenEntity, {
      userId,
      token: secret.base32,
      expireTime,
      verified: false,
    });

    await this.resetPasswordDbService.save(ent);

    return token;
  }

  async checkOtpForUserValid(userId: string) {
    const resetPasswordToken = await this.resetPasswordDbService.getVerifiedOtpByUserId(userId);

    if (!resetPasswordToken) {
      return false;
    }
    if (resetPasswordToken.expireTime < new Date()) {
      return false;
    }
    return true;
  }

  async updateChangedPassenger(userId: string) {
    const resetPasswordToken = await this.resetPasswordDbService.getVerifiedOtpByUserId(userId);

    resetPasswordToken.changedPassword = true;
    await this.resetPasswordDbService.save(resetPasswordToken);
  }

  async verifyToken(userId: string, token: string): Promise<boolean> {
    const resetPasswordToken = await this.resetPasswordDbService.getOtpByUserId(userId);

    if (!resetPasswordToken) {
      return false;
    }
    if (resetPasswordToken.expireTime < new Date()) {
      return false;
    }

    const isValid = speakeasy.totp.verify({
      secret: resetPasswordToken.token,
      encoding: 'base32',
      token,
      window: 5,
      digits: 4,
    });

    if (!isValid) {
      return false;
    }

    resetPasswordToken.verified = true;
    await this.resetPasswordDbService.save(resetPasswordToken);

    return true;
  }
}
