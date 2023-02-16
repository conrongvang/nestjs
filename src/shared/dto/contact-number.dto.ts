import { ApiPropertyOptional } from '@nestjs/swagger';

export class ContactNumberDto {
  @ApiPropertyOptional()
  ext: string;

  @ApiPropertyOptional()
  phoneNumber: string;
}
