import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
};
switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
    });
    break;
  case 'test':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['src/**/*.entity.ts'],
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
    });
    break;
  case 'production':
    Object.assign(dataSourceOptions, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['dist/**/*.entity.js'],
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  default:
    throw new Error('unknown enviroment');
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
