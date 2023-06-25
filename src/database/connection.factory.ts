import { ConfigService } from '@nestjs/config';
import Knex from 'knex';
import { Model } from 'objection';

export const connectionFactory = async (configService: ConfigService) => {
  const knex = Knex({
    client: 'postgresql',
    connection: {
      host: configService.get('DATABASE_HOST'),
      port: configService.get('DATABASE_PORT'),
      user: configService.get('DATABASE_USER'),
      password: configService.get('DATABASE_USER'),
      database: configService.get('DATABASE_NAME'),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  });

  Model.knex(knex);
  return knex;
};
