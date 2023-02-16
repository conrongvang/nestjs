import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CustomerTypeEnum } from '../../consts/customer-type.enum';
import { ContactNumberDto } from '../../dto/contact-number.dto';
import { AddressDto } from '../../dto/address.dto';

@Entity('Customer')
export class CustomerEntity extends BaseEntity {
  @Column()
  customerType?: CustomerTypeEnum;

  @Column({ nullable: true })
  uenNo?: string;

  @Column({ nullable: true })
  picName?: string;

  @Column({ nullable: true })
  picEmail?: string;

  @Column({ nullable: true })
  pocName?: string;

  @Column({ nullable: true })
  pocEmail?: string;

  @Column({ nullable: true })
  company?: string;

  @Column({ nullable: true })
  picContactNo?: ContactNumberDto;

  @Column({ nullable: true })
  pocContactNo?: ContactNumberDto;

  @Column({ nullable: true })
  billingAddress?: AddressDto;

  @Column({ nullable: true })
  remarks?: string;
}
