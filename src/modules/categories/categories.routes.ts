import express from 'express';
import { CategoriesController } from './categories.controller.ts';
import { validateDto, CreateCategoryValidator, UpdateCategoryValidator } from './categories.validation.ts';
import { handleMultipartData } from '../../helper/middleware/multer.middleware.ts';

const router = express.Router();
const categoriesController = new CategoriesController();

router.post('/', handleMultipartData('image'), validateDto(CreateCategoryValidator), categoriesController.create);
router.post('/list', categoriesController.getListing);
router.get('/:id', categoriesController.getOne);
router.put('/:id', handleMultipartData('image'), validateDto(UpdateCategoryValidator), categoriesController.update);
router.delete('/:id', categoriesController.delete);

export default router;
