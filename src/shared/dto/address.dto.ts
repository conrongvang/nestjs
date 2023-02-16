import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  addressLine1?: string;

  @ApiProperty()
  addressLine2?: string;

  @ApiProperty()
  postalCode?: string;
}
