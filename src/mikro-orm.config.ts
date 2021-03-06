/**
 * Author: Rasool Khan
 * Source: https://dev.to/rasoolk16/building-crud-api-with-nestjs-mikro-orm-and-postgres-43b5?fbclid=IwAR3CnVhpNwiv9wG-f-2dhSQQKY6jKHscpdunR1GckFS4PAkatbs8aw7b-d0
 * File to config db and connect to db
 */
import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import env from './env';

const logger = new Logger('MikroORM');
const config = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: env.prod.DBNAME,
  type: 'postgresql',
  host: env.prod.HOST,
  port: env.prod.PORT,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  user: 'rloftexmrgvvwb',
  password: env.prod.DBPASSWORD,
  metadataProvider: TsMorphMetadataProvider,
  driverOptions: {
    connection: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  },
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: './migrations', // path to the folder with migrations
    pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: false, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: true, // allow to disable table and column dropping
    emit: 'ts', // migration generation mode
  },
} as Options;

export default config;
