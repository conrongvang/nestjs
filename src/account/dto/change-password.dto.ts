import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @IsString()
  @ApiProperty()
  newPassword: string;

  @IsString()
  @ApiProperty()
  oldPassword: string;
}
