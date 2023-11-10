import { config } from 'dotenv';
config(); // Initializing dotenv - all config must import below this line.

import { DataSource } from 'typeorm';
import { DatabaseConfig } from '../database.config';
import { DataSourceOptions } from 'typeorm';

export function getConfig() {
  return {
    ...DatabaseConfig,
    entities: ['./src/**/*.entity.ts'],
    migrations: ['./src/migrations/*.ts'],
    migrationsTableName: 'nestjs_migrations',
  } as DataSourceOptions;
}

const dataSource = new DataSource(getConfig());
dataSource.initialize();

export default dataSource;
