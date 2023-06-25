import { UpdatedModel } from '../common/updated.model';

export class UsersModel extends UpdatedModel {
  static tableName = 'users';

  name: string;
  surname: string;
}
