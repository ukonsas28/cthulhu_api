import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  GetOneBookResponseSchema,
  GetOneBookParamSchema,
} from './schema/getOne.schema';
import {
  UpdateBookParamSchema,
  UpdateBookResponseSchema,
  UpdateBookBodySchema,
} from './schema/update.schema';

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
    type: GetOneBookResponseSchema,
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
  getOneBook(@Param() param: GetOneBookParamSchema) {
    return this.booksService.getOneBook(param);
  }

  @ApiOperation({ summary: 'Get books list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Books list with total count',
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

  @ApiOperation({ summary: 'Update select book' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Updated book object',
    type: UpdateBookResponseSchema,
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
  @Patch('update/:id')
  updateBook(
    @Param() param: UpdateBookParamSchema,
    @Body() body: UpdateBookBodySchema,
  ) {
    return this.booksService.updateBook(param, body);
  }
}
