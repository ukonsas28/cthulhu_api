import { Knex } from 'knex';

const booksTableName = 'books';
const personsTableName = 'persons';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(`
    CREATE TABLE ${booksTableName} (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name varchar(255),
        created_at timestamp DEFAULT NOW(),
        updated_at timestamp DEFAULT NOW(),
        deleted_at timestamp
    );

    CREATE TABLE ${personsTableName} (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name varchar(255),
        book_id bigint REFERENCES ${booksTableName} (id),
        created_at timestamp DEFAULT NOW(),
        updated_at timestamp DEFAULT NOW(),
        deleted_at timestamp
    );`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`
    DROP TABLE ${booksTableName};
    DROP TABLE ${personsTableName}`);
}
