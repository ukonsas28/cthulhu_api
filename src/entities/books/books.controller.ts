import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { AddBookResponseSchema, AddBookSchema } from './schema/create.schema';
import {
  BadRequestErrorSchema,
  HttpExceptionErrorSchema,
} from '../base.schema';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({
    summary: 'Add new book',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Added book object',
    type: AddBookResponseSchema,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request Error',
    type: BadRequestErrorSchema,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'HTTP Error',
    type: HttpExceptionErrorSchema,
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  addNewBook(@Body() body: AddBookSchema) {
    return this.booksService.addBook(body);
  }

  @ApiOperation({ summary: 'Get books list' })
  @Get('all')
  getBooksList() {
    return this.booksService.getBooksList();
  }
}
