import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { AddBookResponseSchema, AddBookSchema } from './schema/create.schema';
import {
  BadRequestErrorSchema,
  HttpExceptionErrorSchema,
} from '../base.schema';
import {
  GetBooksListResponseSchema,
  GetBooksListSchema,
} from './schema/getAll.schema';
import {
  GetOneBooksResponseSchema,
  GetOneBooksSchema,
} from './schema/getOne.schema';

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
  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  addNewBook(@Body() body: AddBookSchema) {
    return this.booksService.addBook(body);
  }

  @ApiOperation({ summary: 'Get one book' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'One book object',
    type: GetOneBooksResponseSchema,
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
  @HttpCode(HttpStatus.OK)
  @Get('get-one/:id')
  getOneBook(@Param() params: GetOneBooksSchema) {
    return this.booksService.getOneBook(params);
  }

  @ApiOperation({ summary: 'Get books list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Books list with total',
    type: GetBooksListResponseSchema,
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
  @HttpCode(HttpStatus.OK)
  @Get('get-all')
  getBooksList(@Query() query: GetBooksListSchema) {
    return this.booksService.getBooksList(query);
  }
}
