import { Request, Response } from 'express';
import { ProductsService } from './products.service.ts';
import { ResponseBuilder } from '../../helper/response-builder/response-builder.ts';
import { CreateProductValidator, UpdateProductValidator } from './products.validation.ts';

export class ProductsController {
    private productsService: ProductsService;

    constructor() {
        this.productsService = new ProductsService();
    }

    public create = async (req: Request, res: Response) => {
        try {
            const createDto: CreateProductValidator = req.body;
            if (req.file) {
                createDto.image = req.file.path.replace(/\\/g, '/');
            }
            // Multer parses everything as strings in body, so we need to convert numbers
            if (createDto.price) createDto.price = Number(createDto.price);
            if (createDto.category_id) createDto.category_id = Number(createDto.category_id);

            const result = await this.productsService.create(createDto);
            return res.status(201).json(ResponseBuilder.success('Product created successfully', result));
        } catch (error: any) {
            return res.status(400).json(ResponseBuilder.error(error.message));
        }
    };

    public getAll = async (req: Request, res: Response) => {
        try {
            const result = await this.productsService.findAll();
            return res.status(200).json(ResponseBuilder.success('Products fetched successfully', result));
        } catch (error: any) {
            return res.status(500).json(ResponseBuilder.error(error.message));
        }
    };

    public getListing = async (req: Request, res: Response) => {
        try {
            const result = await this.productsService.getListing(req.body);
            return res.status(200).json(ResponseBuilder.success('Products fetched successfully', result));
        } catch (error: any) {
            return res.status(500).json(ResponseBuilder.error(error.message));
        }
    };

    public getOne = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const result = await this.productsService.findOne(id);
            if (!result) {
                return res.status(404).json(ResponseBuilder.error('Product not found'));
            }
            return res.status(200).json(ResponseBuilder.success('Product fetched successfully', result));
        } catch (error: any) {
            return res.status(500).json(ResponseBuilder.error(error.message));
        }
    };

    public update = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const updateDto: UpdateProductValidator = req.body;
            if (req.file) {
                updateDto.image = req.file.path.replace(/\\/g, '/');
            }
            // Multer parses everything as strings in body, so we need to convert numbers
            if (updateDto.price) updateDto.price = Number(updateDto.price);
            if (updateDto.category_id) updateDto.category_id = Number(updateDto.category_id);

            const result = await this.productsService.update(id, updateDto);
            return res.status(200).json(ResponseBuilder.success('Product updated successfully', result));
        } catch (error: any) {
            return res.status(400).json(ResponseBuilder.error(error.message));
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            await this.productsService.delete(id);
            return res.status(200).json(ResponseBuilder.success('Product deleted successfully', null));
        } catch (error: any) {
            return res.status(400).json(ResponseBuilder.error(error.message));
        }
    };
}
