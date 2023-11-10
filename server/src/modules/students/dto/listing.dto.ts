import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ListStudentsDto {
  @IsOptional()
  @ApiProperty({
    name: 'Page',
  })
  _page: string | number;

  @IsOptional()
  @ApiProperty({
    name: 'Items per page',
  })
  _limit: string | number;
}

export class ListProductsDto {
  @IsOptional()
  @ApiProperty({
    name: 'Page',
  })
  skip: string | number;

  @IsOptional()
  @ApiProperty({
    name: 'Items per page',
  })
  limit: string | number;
}
