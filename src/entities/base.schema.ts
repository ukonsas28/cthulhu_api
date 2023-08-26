import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { HttpStatus } from '@nestjs/common';

export class BaseSchema {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: '2001-09-28 01:00:00' })
  created_at: string;

  @ApiProperty({ example: '2001-09-28 01:00:00' })
  deleted_at: string;

  @ApiProperty({ example: '2001-09-28 01:00:00' })
  updated_at: string;
}

export class BadRequestErrorSchema {
  @ApiProperty({ example: '400' })
  statusCode: number;

  @ApiProperty({
    example: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 'Error',
  })
  error: string;
}

export class HttpExceptionErrorSchema {
  @ApiProperty({ example: '500' })
  statusCode: number;

  @ApiProperty({
    example: 'Error message',
  })
  message: string;
}

export class DeleteParamSchema {
  @IsString()
  @ApiProperty({ example: '1' })
  id: string;
}

export class DeleteResponseSchema {
  @ApiProperty({ example: HttpStatus.NO_CONTENT })
  status: HttpStatus.NO_CONTENT;
}
