import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateOtpRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  otpCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
