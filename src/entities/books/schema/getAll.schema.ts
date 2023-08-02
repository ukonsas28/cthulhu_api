import { IsEnum, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { GetOneBookResponseSchema } from './getOne.schema';

export class GetBooksListSchema {
  @IsString()
  @ApiProperty({ required: false, default: '0' })
  offset: string;

  @IsString()
  @ApiProperty({ required: false, default: '10' })
  limit: string;

  @IsEnum(['ASC', 'DESC'])
  @ApiProperty({ enum: ['ASC', 'DESC'], default: 'ASC', required: false })
  sortByName: ['ASC', 'DESC'];
}

export class GetBooksListResponseSchema {
  @ApiProperty({
    isArray: true,
    type: GetOneBookResponseSchema,
  })
  books: GetOneBookResponseSchema[];
  @ApiProperty({ example: '1' })
  total: number;
}
