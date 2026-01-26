import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional
} from 'sequelize';
import { sequelize } from '../../config/database.config.ts';
import { Tables } from '../../config/tables.ts';

class Category extends Model<
    InferAttributes<Category>,
    InferCreationAttributes<Category>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare image: CreationOptional<string>;
    declare status: CreationOptional<0 | 1>;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            }
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                isIn: [[0, 1]]
            },
            allowNull: false,
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
        modelName: 'Category',
        tableName: Tables.CATEGORY,
        timestamps: false,
        underscored: true,
    }
);

export default Category;
export { Category };
