import { Category } from './categories.model.ts';
import { Op } from 'sequelize';

export class CategoriesService {
    public async create(data: any) {
        return await Category.create(data);
    }

    public async findAll() {
        return await Category.findAll();
    }

    public async findOne(id: number) {
        return await Category.findByPk(id);
    }

    public async update(id: number, data: any) {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return await category.update(data);
    }

    public async delete(id: number) {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return await category.destroy();
    }

    public async getListing(params: any) {
        const { order, search, filter, offset, limit, allrecords, searchfields } = params;
        const where: any = {};

        if (search) {
            if (searchfields && Array.isArray(searchfields) && searchfields.length > 0) {
                // Currently only 'name' is in the main table. Complex relations like 'translations.name' 
                // would require 'include' logic which is out of scope for the current single-table setup.
                // We map known fields or default to column checks for now.
                const orConditions = searchfields.map((field: string) => {
                    // Simple mapping for now, assuming fields are columns on this table
                    // For nested relations, we would need checking or separate logic.
                    if (field === 'name') {
                        return { name: { [Op.like]: `%${search}%` } };
                    }
                    // If user passes 'translations.name' but we only have 'name', we ignore or handle effectively.
                    // For now, let's just support 'name' as a specific example. 
                    // If we want to support any column blindly:
                    // return { [field]: { [Op.like]: `%${search}%` } };
                    return {};
                }).filter(condition => Object.keys(condition).length > 0);

                if (orConditions.length > 0) {
                    where[Op.or] = orConditions;
                }
            } else {
                where.name = { [Op.like]: `%${search}%` };
            }
        }

        if (filter && filter.status !== undefined) {
            if (Array.isArray(filter.status)) {
                where.status = { [Op.in]: filter.status };
            } else {
                where.status = filter.status;
            }
        }

        const queryOptions: any = {
            where,
            order: order || [['created_at', 'DESC']],
        };

        if (!allrecords) {
            queryOptions.offset = offset || 0;
            queryOptions.limit = limit || 10;
        }

        const { count, rows } = await Category.findAndCountAll(queryOptions);

        return {
            data: rows,
            totalRecords: count,
            offset: queryOptions.offset || 0,
            limit: queryOptions.limit || count
        };
    }
}
