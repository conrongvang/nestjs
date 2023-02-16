import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContactNumberDto } from './contact-number.dto';
import { IsDateString, IsEmail, IsEnum, IsString } from 'class-validator';
import { RolesEnum } from '../consts/roles.enum';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsString()
  phoneNo: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  organizationName: string;

  @ApiPropertyOptional()
  organizationId?: string;

  @ApiPropertyOptional()
  country?: string;

  @ApiProperty({
    enum: RolesEnum,
  })
  @IsEnum(RolesEnum)
  role: RolesEnum;
}
