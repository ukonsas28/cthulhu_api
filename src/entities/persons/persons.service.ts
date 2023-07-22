import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { PersonsModel } from '../../database/models/persons/persons.model';

@Injectable()
export class PersonsService {
  constructor(
    @Inject('PERSONSMODEL_TOKEN')
    private readonly PersonsModel: ModelClass<PersonsModel>,
  ) {}

  async getPersonsList(): Promise<PersonsModel[]> {
    const personsList = await this.PersonsModel.query().select('*');
    return personsList;
  }

  async getPersonById(id: number): Promise<PersonsModel> {
    const [oneUser] = await this.PersonsModel.query()
      .select('*')
      .where('id', id);
    return oneUser;
  }
}
