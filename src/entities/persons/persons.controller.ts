import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonsService } from './persons.service';
import { GetOnePersonResponseSchema } from './schema/getOne.schema';
import {
  BadRequestErrorSchema,
  DeleteParamSchema,
  DeleteResponseSchema,
  HttpExceptionErrorSchema,
} from '../base.schema';
import { GetOneBookParamSchema } from '../books/schema/getOne.schema';
import {
  GetPersonsListResponseSchema,
  GetPersonsListSchema,
  AddPersonResponseSchema,
  CreatePersonSchema,
  UpdatePersonBodySchema,
  UpdatePersonParamSchema,
  UpdatePersonResponseSchema,
} from './schema';

@ApiTags('persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @ApiOperation({
    summary: 'Add new person',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Added person object',
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
  addNewBook(@Body() body: CreatePersonSchema) {
    return this.personsService.createPerson(body);
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

  @ApiOperation({ summary: 'Update select person' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated person object',
    type: UpdatePersonResponseSchema,
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
  updatePerson(
    @Param() param: UpdatePersonParamSchema,
    @Body() body: UpdatePersonBodySchema,
  ) {
    return this.personsService.updatePerson(param, body);
  }

  @ApiOperation({ summary: 'Delete person' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Updated book object',
    type: DeleteResponseSchema,
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  deleteBook(@Param() param: DeleteParamSchema) {
    return this.personsService.deletePerson(param);
  }
}
