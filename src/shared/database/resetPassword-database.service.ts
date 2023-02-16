import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { DatabaseService } from './database.service';
import { ResetPasswordTokenEntity } from './entities/resetPasswordToken.entity';

@Injectable()
export class ResetPasswordDbService extends DatabaseService {
  constructor(
    @InjectRepository(ResetPasswordTokenEntity)
    private resetPasswordDbRepository: MongoRepository<ResetPasswordTokenEntity>,
  ) {
    super(ResetPasswordDbService.name);
  }

  async save(ent: ResetPasswordTokenEntity) {
    return await this.resetPasswordDbRepository.save(ent);
  }
  async getOtpByUserId(userId: string) {
    return this.resetPasswordDbRepository.findOne({
      where: { userId, verified: false },
      order: {
        createdDate: 'DESC',
      },
    });
  }

  async getVerifiedOtpByUserId(userId: string) {
    return this.resetPasswordDbRepository.findOne({
      where: { userId, verified: true, changedPassword: false },
      order: {
        createdDate: 'DESC',
      },
    });
  }
}
