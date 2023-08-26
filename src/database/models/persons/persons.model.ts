import { BaseModel } from '../base.model';

export class PersonsModel extends BaseModel {
  static tableName = 'persons';

  name: string;
  book_id: string;
}
