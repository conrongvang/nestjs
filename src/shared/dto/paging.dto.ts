import { ApiPropertyOptional } from '@nestjs/swagger';

export class PagingDto {
  @ApiPropertyOptional({ description: 'Default is 1', default: 1 })
  page?: number;

  @ApiPropertyOptional({ description: 'Optional. Default is 25', default: 25 })
  pageSize?: number;
}
