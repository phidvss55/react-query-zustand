import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppEnv } from './app.env';
import { DatabaseLogger } from './typeorm/typeorm.logger';

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: AppEnv.dbHost,
  port: Number.parseInt(AppEnv.dbPort),
  username: AppEnv.dbUsername,
  password: AppEnv.dbPassword,
  database: AppEnv.dbName,
  autoLoadEntities: true,
  maxQueryExecutionTime: 1000,
  synchronize: false,
  logger: new DatabaseLogger(
    AppEnv.dbDebug == 'true' ? 'all' : ['warn', 'error', 'migration', 'schema'],
  ),
  namingStrategy: new SnakeNamingStrategy(),
};
