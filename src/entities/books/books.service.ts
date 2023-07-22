import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BooksModel } from '../../database/models/books/books.model';
import { AddBookSchema } from './schema/create.schema';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKSMODEL_TOKEN')
    private readonly BooksModel: ModelClass<BooksModel>,
  ) {}

  async addBook(body: AddBookSchema): Promise<AddBookSchema> {
    const addedBook = await this.BooksModel.knex().raw(
      `INSERT INTO ${BooksModel.tableName} (name) VALUES ('${body.name}') RETURNING *`,
    );

    return addedBook.rows;
  }

  async getBooksList(): Promise<BooksModel[]> {
    const booksList = await this.BooksModel.knex().raw(
      `SELECT * FROM ${BooksModel.tableName}`,
    );

    return booksList.rows;
  }
}
