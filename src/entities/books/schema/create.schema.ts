import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseSchema } from '../../base.schema';

export class CreateBookSchema extends BaseSchema {
  @IsString()
  @ApiProperty({ example: 'Dagon' })
  name: string;
}

export class AddBookResponseSchema extends CreateBookSchema {}
