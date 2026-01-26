import express from 'express';
import { ProductsController } from './products.controller.ts';
import { validateDto, CreateProductValidator, UpdateProductValidator } from './products.validation.ts';
import { upload } from '../../config/multer.config.ts';

const router = express.Router();
const productsController = new ProductsController();

router.post('/', upload.single('image'), validateDto(CreateProductValidator), productsController.create);
router.post('/list', productsController.getListing);
router.get('/:id', productsController.getOne);
router.put('/:id', upload.single('image'), validateDto(UpdateProductValidator), productsController.update);
router.delete('/:id', productsController.delete);

export default router;
