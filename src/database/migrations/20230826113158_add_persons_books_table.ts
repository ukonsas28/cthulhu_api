import { Knex } from 'knex';
import { PersonsModel } from '../models/persons/persons.model';
import { BooksModel } from '../models/books/books.model';
import { PersonsBooksModel } from '../models/persons_books/persons_books.model';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    ALTER TABLE ${PersonsModel.tableName} DROP COLUMN book_id;
    
    CREATE TABLE  ${PersonsBooksModel.tableName} (
        CONSTRAINT id PRIMARY KEY (person_id, book_id),
        person_id bigint REFERENCES ${PersonsModel.tableName} (id),
        book_id bigint REFERENCES ${BooksModel.tableName} (id)
    );`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    ALTER TABLE ${PersonsModel.tableName}
    ADD COLUMN book_id bigint REFERENCES ${BooksModel.tableName} (id);

    DROP TABLE  ${PersonsBooksModel.tableName}`);
}
