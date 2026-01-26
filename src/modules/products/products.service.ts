import { Product } from './products.model.ts';
import { Op } from 'sequelize';

export class ProductsService {
    public async create(data: any) {
        return await Product.create(data);
    }

    public async findAll() {
        return await Product.findAll();
    }

    public async findOne(id: number) {
        return await Product.findByPk(id);
    }

    public async update(id: number, data: any) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return await product.update(data);
    }

    public async delete(id: number) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return await product.destroy();
    }

    public async getListing(params: any) {
        const { order, search, filter, offset, limit, allrecords, searchfields } = params;
        const where: any = {};

        if (search) {
            if (searchfields && Array.isArray(searchfields) && searchfields.length > 0) {
                const orConditions = searchfields.map((field: string) => {
                    // Simple mapping for now
                    if (field === 'name') {
                        return { name: { [Op.like]: `%${search}%` } };
                    }
                    return {};
                }).filter(condition => Object.keys(condition).length > 0);

                if (orConditions.length > 0) {
                    where[Op.or] = orConditions;
                }
            } else {
                where.name = { [Op.like]: `%${search}%` };
            }
        }

        if (filter) {
            if (filter.status !== undefined) {
                if (Array.isArray(filter.status)) {
                    where.status = { [Op.in]: filter.status };
                } else {
                    where.status = filter.status;
                }
            }
            if (filter.category_id !== undefined) {
                if (Array.isArray(filter.category_id)) {
                    where.category_id = { [Op.in]: filter.category_id };
                } else {
                    where.category_id = filter.category_id;
                }
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

        const { count, rows } = await Product.findAndCountAll(queryOptions);

        return {
            data: rows,
            totalRecords: count,
            offset: queryOptions.offset || 0,
            limit: queryOptions.limit || count
        };
    }
}
