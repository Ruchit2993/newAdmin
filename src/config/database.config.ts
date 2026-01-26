import { Sequelize } from 'sequelize';
import 'dotenv/config';
import { en } from '../helper/constants/en.ts';

export const sequelize = new Sequelize(
    process.env.DB_DBNAME as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWWORD as string,
    {
        host: process.env.DB_HOST as string,
        dialect: (process.env.DB_DIALECT || 'mysql') as any,
        logging: false,
        define: {
            timestamps: true,
            underscored: true,
        },
    }
);

export async function testConnection(): Promise<void> {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log(en.SUCCESS.DB_CONN_SUCCESS);
    } catch (error) {
        console.error(en.ERROR.DB_CONN_ERR, error);
    }
}
