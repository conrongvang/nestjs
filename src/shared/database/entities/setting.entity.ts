import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export class CompanyInfoEntity {
  @Column()
  addressLine1: string;

  @Column()
  addressLine2: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;

  @Column()
  telNo: string;

  @Column()
  faxNo: string;

  @Column()
  email: string;

  @Column()
  website: string;
}

@Entity('Setting')
export class SettingEntity extends BaseEntity {
  @Column()
  companyInfo: CompanyInfoEntity;
}
