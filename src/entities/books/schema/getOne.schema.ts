import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from '../../base.schema';

export class GetOneBooksSchema {
  @IsString()
  @ApiProperty({ example: 1 })
  id: string;
}

export class GetOneBooksResponseSchema extends BaseSchema {
  @ApiProperty({ example: 'Dagon' })
  name: string;
}
