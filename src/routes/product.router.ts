import { Router } from 'express';
import ProductController from '../app/controller/ProductController';
import createValidation from '../app/validations/product/create';

const router = Router();

router.post('/product', createValidation, ProductController.create);

export default router;
