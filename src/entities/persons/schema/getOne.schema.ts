import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from '../../base.schema';

export class GetOnePersonParamSchema {
  @IsString()
  @ApiProperty({ example: '1' })
  id: string;
}

export class GetOnePersonResponseSchema extends BaseSchema {
  @ApiProperty({ example: 'Dagon' })
  name: string;

  @ApiProperty({ example: '1' })
  book_id: string;
}
