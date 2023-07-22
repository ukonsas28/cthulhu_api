import { BaseModel } from '../base.model';

export class BooksModel extends BaseModel {
  static tableName = 'books';

  booksName: string;
}
