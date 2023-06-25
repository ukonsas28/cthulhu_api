import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connectionFactory } from './connection.factory';
import { models } from './models';

const providers = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: connectionFactory,
    inject: [ConfigService],
  },
  ...models.map((model) => ({ provide: model.name, useValue: model })),
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
