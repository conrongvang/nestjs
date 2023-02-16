import { Column, CreateDateColumn, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('ResetPasswordOtp')
export class ResetPasswordTokenEntity extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  token: string;

  @Column()
  expireTime: Date;

  @Column({ default: false })
  verified: boolean = false;

  @Column({ default: false })
  changedPassword: boolean = false;
}
