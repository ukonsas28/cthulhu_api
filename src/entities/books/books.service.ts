import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BooksModel } from '../../database/models/books/books.model';
import { AddBookSchema } from './schema/create.schema';
import { GetBooksListSchema } from './schema/getAll.schema';
import { GetOneBookParamSchema } from './schema/getOne.schema';
import {
  UpdateBookBodySchema,
  UpdateBookParamSchema,
} from './schema/update.schema';
import { getPreparedKeys, getPreparedValues } from '../../utils/prepare-data';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKSMODEL_TOKEN')
    private readonly BooksModel: ModelClass<BooksModel>,
  ) {}

  async addBook(body: AddBookSchema): Promise<AddBookSchema> {
    const addedBook = await this.BooksModel.knex().raw(
      `INSERT INTO ${BooksModel.tableName} (name) 
      VALUES ('${body.name}') 
      RETURNING *`,
    );

    return addedBook.rows[0];
  }

  async getOneBook(param: GetOneBookParamSchema): Promise<BooksModel> {
    const oneBook = await this.BooksModel.knex().raw(
      `SELECT * FROM ${BooksModel.tableName} 
      WHERE id = '${param.id}'`,
    );

    return oneBook.rows;
  }

  async getBooksList(query: GetBooksListSchema): Promise<BooksModel[]> {
    const booksList = await this.BooksModel.knex().raw(
      `SELECT * FROM ${BooksModel.tableName} 
      ORDER BY name ${query.sortByName || 'ASC'} 
      OFFSET ${query.offset || 0} 
      LIMIT ${query.limit || 10}`,
    );

    return booksList.rows;
  }

  async updateBook(
    param: UpdateBookParamSchema,
    body: UpdateBookBodySchema,
  ): Promise<BooksModel> {
    const updateBook = await this.BooksModel.knex().raw(
      `UPDATE ${BooksModel.tableName} 
      SET (${getPreparedKeys(body)}) =
      ROW(${getPreparedValues(body)})
      WHERE id = '${param.id}'
      RETURNING *`,
    );

    return updateBook.rows[0];
  }
}
