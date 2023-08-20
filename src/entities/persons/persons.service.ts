import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { PersonsModel } from '../../database/models/persons/persons.model';
import { GetOnePersonParamSchema } from './schema/getOne.schema';
import { GetPersonsListSchema } from './schema/getAll.schema';
import { AddPersonSchema } from './schema/create.schema';

@Injectable()
export class PersonsService {
  constructor(
    @Inject('PERSONSMODEL_TOKEN')
    private readonly PersonsModel: ModelClass<PersonsModel>,
  ) {}

  async addPerson({ name, bookId }: AddPersonSchema): Promise<PersonsModel> {
    const onePerson = await this.PersonsModel.knex().raw(
      `INSERT INTO ${PersonsModel.tableName} (name, book_id)
      VALUES ('${name}', '${bookId}')
      RETURNING *`,
    );

    return onePerson.rows[0];
  }

  async getPersonsList({
    limit,
    offset,
    sortByName,
  }: GetPersonsListSchema): Promise<PersonsModel[]> {
    const personsList = await this.PersonsModel.knex().raw(`
    SELECT * FROM ${PersonsModel.tableName}
    ORDER BY name ${sortByName || 'ASC'}
    OFFSET ${offset || '0'}
    LIMIT ${limit || '10'}`);
    return personsList.rows;
  }

  async getPersonById({ id }: GetOnePersonParamSchema): Promise<PersonsModel> {
    const onePerson = await this.PersonsModel.knex().raw(`
    SELECT * FROM ${PersonsModel.tableName} WHERE id = '${id}'`);
    return onePerson.rows[0];
  }
}
