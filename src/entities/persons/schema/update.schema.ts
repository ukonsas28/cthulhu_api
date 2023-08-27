import { IsString } from 'class-validator';
import { GetOnePersonResponseSchema } from './getOne.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePersonParamSchema {
  @IsString()
  @ApiProperty({ example: '1' })
  id: string;
}

export class UpdatePersonBodySchema {
  @IsString()
  @ApiProperty({ example: 'Dagon' })
  name: string;

  @IsString()
  @ApiProperty({ example: '1' })
  bookId: string;
}

export class UpdatePersonResponseSchema extends GetOnePersonResponseSchema {}
