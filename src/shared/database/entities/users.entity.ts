import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { RolesEnum } from '../../consts/roles.enum';
import { BaseEntity } from './base.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  phoneNo: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Exclude()
  @Column({ select: false })
  salt: string;

  @Column({ nullable: true })
  organizationId?: string;

  @Column({ nullable: true })
  organizationName: string;

  @Column({ nullable: true })
  country: string;

  @Column({ array: false, enum: RolesEnum })
  role: RolesEnum;
}
