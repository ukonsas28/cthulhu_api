import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonsService } from './persons.service';
import { GetOnePersonResponseSchema } from './schema/getOne.schema';
import {
  BadRequestErrorSchema,
  HttpExceptionErrorSchema,
} from '../base.schema';
import { GetOneBookParamSchema } from '../books/schema/getOne.schema';
import {
  GetPersonsListResponseSchema,
  GetPersonsListSchema,
} from './schema/getAll.schema';
import {
  AddPersonResponseSchema,
  AddPersonSchema,
} from './schema/create.schema';

@ApiTags('persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @ApiOperation({
    summary: 'Add new book',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Added book object',
    type: AddPersonResponseSchema,
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
  addNewBook(@Body() body: AddPersonSchema) {
    return this.personsService.addPerson(body);
  }

  @ApiOperation({ summary: 'Get persons list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Persons list with total count',
    type: GetPersonsListResponseSchema,
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
  getPersonsList(@Query() query: GetPersonsListSchema) {
    return this.personsService.getPersonsList(query);
  }

  @ApiOperation({ summary: 'Get one person' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'One person object',
    type: GetOnePersonResponseSchema,
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
  getPersonById(@Param() param: GetOneBookParamSchema) {
    return this.personsService.getPersonById(param);
  }
}
