import { Product } from './products.model.ts';

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
}
