import { HttpStatus, Inject, Injectable } from '@nestjs/common';
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
import {
  DeleteBookParamSchema,
  DeleteBookResponseSchema,
} from './schema/delete.schema';
import { log } from 'console';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKSMODEL_TOKEN')
    private readonly BooksModel: ModelClass<BooksModel>,
  ) {}

  async addBook({ name }: AddBookSchema): Promise<AddBookSchema> {
    const addedBook = await this.BooksModel.knex().raw(
      `INSERT INTO ${BooksModel.tableName} (name) 
      VALUES ('${name}') 
      RETURNING *`,
    );

    return addedBook.rows[0];
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

    log(updateBook);

    return updateBook.rows[0];
  }

  async deleteBook({
    id,
  }: DeleteBookParamSchema): Promise<DeleteBookResponseSchema> {
    await this.BooksModel.knex().raw(
      `DELETE FROM ${BooksModel.tableName} WHERE id = '${id}'`,
    );

    return { status: HttpStatus.NO_CONTENT };
  }
}
