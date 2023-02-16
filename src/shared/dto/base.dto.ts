import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseDto {
  @ApiPropertyOptional({})
  createdDate?: Date;

  @ApiPropertyOptional({})
  updateDate?: Date;

  @ApiPropertyOptional({})
  isActive?: boolean;
}
