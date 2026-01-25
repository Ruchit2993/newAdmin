import { Category } from './categories.model.ts';

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
}
