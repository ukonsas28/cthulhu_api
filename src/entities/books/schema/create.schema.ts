import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddBookSchema {
  @IsString()
  @ApiProperty({ example: 'Dagon', description: 'Name of the created book' })
  name: string;
}

export class AddBookResponseSchema {
  @ApiProperty({ example: '1', description: 'id of the created book' })
  id: number;
}
