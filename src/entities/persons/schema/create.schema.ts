import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseSchema } from '../../base.schema';

export class CreatePersonSchema extends BaseSchema {
  @IsString()
  @ApiProperty({ example: 'Dagon' })
  name: string;

  @IsString()
  @ApiProperty({ example: '1' })
  bookId: string;
}

export class AddPersonResponseSchema extends CreatePersonSchema {}
