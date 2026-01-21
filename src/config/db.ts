import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
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

export default sequelize;
