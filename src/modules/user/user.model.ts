import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional
} from 'sequelize';
import { sequelize } from '../../config/database.config.ts';
import { Tables } from '../../config/tables.ts';

class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: Tables.USER,
        timestamps: false, // Using manual created_at/updated_at as in user example
        underscored: true,
    }
);

export default User;
export { User };
