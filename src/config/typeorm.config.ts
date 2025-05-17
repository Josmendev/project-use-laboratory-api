import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envs } from './envs.config';

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: envs.db.host,
  port: envs.db.port,
  username: envs.db.username,
  password: envs.db.password,
  database: envs.db.database,
  synchronize: envs.db.synchronize,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});
