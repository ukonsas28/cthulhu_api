import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from '../../base.schema';

export class GetOneBookParamSchema {
  @IsString()
  @ApiProperty({ example: '1' })
  id: string;
}

export class GetOneBookResponseSchema extends BaseSchema {
  @ApiProperty({ example: 'Dagon' })
  name: string;
}
