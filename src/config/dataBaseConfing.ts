import 'dotenv/config';
import sequelize from './db.ts';
import { en } from '../helper/constants/en.ts';
import { User } from '../modules/user/user.model.ts'; // Import for registration/initialization

async function testConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(en.SUCCESS.DB_CONN_SUCCESS);
  } catch (error) {
    console.error(en.ERROR.DB_CONN_ERR, error);
  }
}

export { sequelize, testConnection };
