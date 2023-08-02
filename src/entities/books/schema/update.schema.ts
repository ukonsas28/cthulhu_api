import { IsString } from 'class-validator';
import { GetOneBookResponseSchema } from './getOne.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookParamSchema {
  @IsString()
  @ApiProperty({ example: '1' })
  id: string;
}

export class UpdateBookBodySchema {
  @IsString()
  @ApiProperty({ example: 'Call of Cthulhu' })
  name: string;
}

export class UpdateBookResponseSchema extends GetOneBookResponseSchema {}
