import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { PersonsModel } from '../../database/models/persons/persons.model';
import { GetOnePersonParamSchema } from './schema/getOne.schema';
import { BooksModel } from '../../database/models/books/books.model';
import {
  GetPersonsListSchema,
  CreatePersonSchema,
  UpdatePersonBodySchema,
  UpdatePersonParamSchema,
} from './schema';
import { getPreparedKeys, getPreparedValues } from '../../utils/prepare-data';
import { DeleteParamSchema, DeleteResponseSchema } from '../base.schema';
import { PersonsBooksModel } from '../../database/models/persons_books/persons_books.model';

@Injectable()
export class PersonsService {
  constructor(
    @Inject('PERSONSMODEL_TOKEN')
    private readonly PersonsModel: ModelClass<PersonsModel>,
  ) {}

  async createPerson({
    name,
    bookId,
  }: CreatePersonSchema): Promise<PersonsModel> {
    const createdPerson = await this.PersonsModel.knex().raw(
      `INSERT INTO ${PersonsModel.tableName} (name, book_id)
      VALUES ('${name}', '${bookId}')
      RETURNING *`,
    );

    return createdPerson.rows[0];
  }

  async getPersonsList({
    limit,
    offset,
    sortByName,
  }: GetPersonsListSchema): Promise<PersonsModel[]> {
    const personsList = await this.PersonsModel.knex().raw(
      `SELECT
        ${PersonsModel.tableName}.*,
        ${BooksModel.tableName}.name as book_name
      FROM ${PersonsModel.tableName}
      LEFT JOIN ${PersonsBooksModel.tableName} ON
        ${PersonsBooksModel.tableName}.person_id = ${PersonsModel.tableName}.id
      LEFT JOIN ${BooksModel.tableName} ON
        ${PersonsBooksModel.tableName}.book_id = ${BooksModel.tableName}.id
      ORDER BY name ${sortByName || 'ASC'}
      OFFSET ${offset || '0'}
      LIMIT ${limit || '10'}`,
    );

    return personsList.rows;
  }

  async getPersonById({ id }: GetOnePersonParamSchema): Promise<PersonsModel> {
    const onePerson = await this.PersonsModel.knex().raw(
      `SELECT
      ${PersonsModel.tableName}.*,
      ${BooksModel.tableName}.name as book_name
      FROM ${PersonsModel.tableName}
      LEFT JOIN ${PersonsBooksModel.tableName} ON
        ${PersonsBooksModel.tableName}.person_id = ${PersonsModel.tableName}.id
      LEFT JOIN ${BooksModel.tableName} ON
        ${PersonsBooksModel.tableName}.book_id = ${BooksModel.tableName}.id
      WHERE ${PersonsModel.tableName}.id = '${id}'`,
    );

    return onePerson.rows[0];
  }

  async updatePerson(
    { id }: UpdatePersonParamSchema,
    body: UpdatePersonBodySchema,
  ): Promise<PersonsModel> {
    const updatePerson = await this.PersonsModel.knex().raw(
      `UPDATE ${BooksModel.tableName} 
      SET (${getPreparedKeys(body)}) =
      ROW(${getPreparedValues(body)})
      WHERE id = '${id}'
      RETURNING *`,
    );

    return updatePerson.rows[0];
  }

  async deletePerson({ id }: DeleteParamSchema): Promise<DeleteResponseSchema> {
    await this.PersonsModel.knex().raw(
      `DELETE FROM ${PersonsModel.tableName} WHERE id = '${id}'`,
    );

    return { status: HttpStatus.NO_CONTENT };
  }
}
