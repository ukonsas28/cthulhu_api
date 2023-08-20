import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class DeleteBookParamSchema {
  @IsString()
  @ApiProperty({ example: '1' })
  id: string;
}

export class DeleteBookResponseSchema {
  @ApiProperty({ example: HttpStatus.NO_CONTENT })
  status: HttpStatus.NO_CONTENT;
}
