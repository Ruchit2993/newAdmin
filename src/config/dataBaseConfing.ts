import 'dotenv/config';
import { Sequelize } from 'sequelize';
import { en } from '../helper/constants/en.ts';

const dialect = (process.env.DB_DIALECT || 'mysql') as
  | 'mysql'
  | 'postgres'
  | 'mariadb'
  | 'mssql'
  | 'sqlite';

const sequelize = new Sequelize(
  process.env.DB_DBNAME as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect,
  }
);

async function testConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log(en.SUCCESS.DB_CONN_SUCCESS);
  } catch (error) {
    console.error(en.ERROR.DB_CONN_ERR, error);
  }
}

export { sequelize, testConnection };
