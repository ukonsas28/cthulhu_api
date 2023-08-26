import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BooksModel } from '../../database/models/books/books.model';

import { getPreparedKeys, getPreparedValues } from '../../utils/prepare-data';

import {
  CreateBookSchema,
  GetBooksListSchema,
  GetOneBookParamSchema,
  UpdateBookBodySchema,
  UpdateBookParamSchema,
} from './schema';
import { DeleteParamSchema, DeleteResponseSchema } from '../base.schema';
@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKSMODEL_TOKEN')
    private readonly BooksModel: ModelClass<BooksModel>,
  ) {}

  async createBook({ name }: CreateBookSchema): Promise<BooksModel> {
    const createsBook = await this.BooksModel.knex().raw(
      `INSERT INTO ${BooksModel.tableName} (name) 
      VALUES ('${name}') 
      RETURNING *`,
    );

    return createsBook.rows[0];
  }

  async getOneBook({ id }: GetOneBookParamSchema): Promise<BooksModel> {
    const oneBook = await this.BooksModel.knex().raw(
      `SELECT * FROM ${BooksModel.tableName} 
      WHERE id = '${id}'`,
    );

    return oneBook.rows[0];
  }

  async getBooksList({
    limit,
    offset,
    sortByName,
  }: GetBooksListSchema): Promise<BooksModel[]> {
    const booksList = await this.BooksModel.knex().raw(
      `SELECT * FROM ${BooksModel.tableName} 
      ORDER BY name ${sortByName || 'ASC'} 
      OFFSET ${offset || 0} 
      LIMIT ${limit || 10}`,
    );

    return booksList.rows;
  }

  async updateBook(
    { id }: UpdateBookParamSchema,
    body: UpdateBookBodySchema,
  ): Promise<BooksModel> {
    const updateBook = await this.BooksModel.knex().raw(
      `UPDATE ${BooksModel.tableName} 
      SET (${getPreparedKeys(body)}) =
      ROW(${getPreparedValues(body)})
      WHERE id = '${id}'
      RETURNING *`,
    );

    return updateBook.rows[0];
  }

  async deleteBook({ id }: DeleteParamSchema): Promise<DeleteResponseSchema> {
    await this.BooksModel.knex().raw(
      `DELETE FROM ${BooksModel.tableName} WHERE id = '${id}'`,
    );

    return { status: HttpStatus.NO_CONTENT };
  }
}
