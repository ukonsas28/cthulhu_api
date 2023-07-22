import { Module } from '@nestjs/common';
import { PersonsModule } from './persons/persons.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [PersonsModule, BooksModule],
})
export class EntityModule {}
