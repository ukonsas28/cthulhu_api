import { ApiProperty } from '@nestjs/swagger';

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
