import express from 'express';
import { CategoriesController } from './categories.controller.ts';
import { validateDto, CreateCategoryValidator, UpdateCategoryValidator } from './categories.validation.ts';
import { upload } from '../../config/multer.config.ts';

const router = express.Router();
const categoriesController = new CategoriesController();

router.post('/', upload.single('image'), validateDto(CreateCategoryValidator), categoriesController.create);
router.post('/list', categoriesController.getListing);
router.get('/:id', categoriesController.getOne);
router.put('/:id', upload.single('image'), validateDto(UpdateCategoryValidator), categoriesController.update);
router.delete('/:id', categoriesController.delete);

export default router;
