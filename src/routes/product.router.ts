import { Router } from 'express';
import ProductController from '../app/controller/ProductController';
import createValidation from '../app/validations/product/create';
import putValidation from '../app/validations/product/put';

const router = Router();

router.post('/api/v1/product', createValidation, ProductController.create);
router.put('/api/v1/product/:id', putValidation, ProductController.update);

export default router;
