import express from 'express';
import { ProductsController } from './products.controller.ts';
import { validateDto, CreateProductValidator, UpdateProductValidator } from './products.validation.ts';
import { handleMultipartData } from '../../helper/middleware/multer.middleware.ts';

const router = express.Router();
const productsController = new ProductsController();

router.post('/', handleMultipartData('image'), validateDto(CreateProductValidator), productsController.create);
router.post('/list', productsController.getListing);
router.get('/:id', productsController.getOne);
router.put('/:id', handleMultipartData('image'), validateDto(UpdateProductValidator), productsController.update);
router.delete('/:id', productsController.delete);

export default router;
