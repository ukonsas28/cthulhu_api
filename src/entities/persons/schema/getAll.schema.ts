import { IsEnum, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { GetOnePersonResponseSchema } from './getOne.schema';

export class GetPersonsListSchema {
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

export class GetPersonsListResponseSchema {
  @ApiProperty({
    isArray: true,
    type: GetOnePersonResponseSchema,
  })
  persons: GetOnePersonResponseSchema[];
  @ApiProperty({ example: '1' })
  total: number;
}
