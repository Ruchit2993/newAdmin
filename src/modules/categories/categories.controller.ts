import { Request, Response } from 'express';
import { CategoriesService } from './categories.service.ts';
import { ResponseBuilder } from '../../helper/response-builder/response-builder.ts';
import { CreateCategoryValidator, UpdateCategoryValidator } from './categories.validation.ts';

export class CategoriesController {
    private categoriesService: CategoriesService;

    constructor() {
        this.categoriesService = new CategoriesService();
    }

    public create = async (req: Request, res: Response) => {
        try {
            const createDto: CreateCategoryValidator = req.body;
            if (req.file) {
                createDto.image = req.file.path.replace(/\\/g, '/'); // Store relative path, normalize slashes
            } else {
                return res.status(400).json(ResponseBuilder.error('Image is required'));
            }
            const result = await this.categoriesService.create(createDto);
            return res.status(201).json(ResponseBuilder.success('Category created successfully', result));
        } catch (error: any) {
            return res.status(400).json(ResponseBuilder.error(error.message));
        }
    };

    public getAll = async (req: Request, res: Response) => {
        try {
            const result = await this.categoriesService.findAll();
            return res.status(200).json(ResponseBuilder.success('Categories fetched successfully', result));
        } catch (error: any) {
            return res.status(500).json(ResponseBuilder.error(error.message));
        }
    };

    public getListing = async (req: Request, res: Response) => {
        try {
            const result = await this.categoriesService.getListing(req.body);
            return res.status(200).json(ResponseBuilder.success('Categories fetched successfully', result));
        } catch (error: any) {
            return res.status(500).json(ResponseBuilder.error(error.message));
        }
    };

    public getOne = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const result = await this.categoriesService.findOne(id);
            if (!result) {
                return res.status(404).json(ResponseBuilder.error('Category not found'));
            }
            return res.status(200).json(ResponseBuilder.success('Category fetched successfully', result));
        } catch (error: any) {
            return res.status(500).json(ResponseBuilder.error(error.message));
        }
    };

    public update = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const updateDto: UpdateCategoryValidator = req.body;
            if (req.file) {
                updateDto.image = req.file.path.replace(/\\/g, '/');
            }
            const result = await this.categoriesService.update(id, updateDto);
            return res.status(200).json(ResponseBuilder.success('Category updated successfully', result));
        } catch (error: any) {
            return res.status(400).json(ResponseBuilder.error(error.message));
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            await this.categoriesService.delete(id);
            return res.status(200).json(ResponseBuilder.success('Category deleted successfully', null));
        } catch (error: any) {
            return res.status(400).json(ResponseBuilder.error(error.message));
        }
    };
}
