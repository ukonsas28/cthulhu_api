import { Knex } from 'knex';

import { BooksModel } from '../models/books/books.model';
import { PersonsModel } from '../models/persons/persons.model';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(`
    CREATE TABLE ${BooksModel.tableName} (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name varchar(255),
        created_at timestamp DEFAULT NOW(),
        updated_at timestamp DEFAULT NOW(),
        deleted_at timestamp
    );

    CREATE TABLE ${PersonsModel.tableName} (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name varchar(255),
        book_id bigint REFERENCES ${BooksModel.tableName} (id),
        created_at timestamp DEFAULT NOW(),
        updated_at timestamp DEFAULT NOW(),
        deleted_at timestamp
    );`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`
    DROP TABLE ${BooksModel.tableName};
    DROP TABLE ${PersonsModel.tableName}`);
}
