import { UpdatedModel } from '../common/updated.model';

export class PersonsModel extends UpdatedModel {
  static tableName = 'persons';

  name: string;
  surname: string;
}
