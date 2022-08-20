import { Router } from 'express'
import ProductController from '../app/controller/ProductController'
import createValidation from '../app/validations/product/create'
import putValidation from '../app/validations/product/put'
import patchValidation from '../app/validations/product/patch'

const router = Router()

router.post('/api/v1/product', createValidation, ProductController.create)
router.get('/api/v1/product/:id', ProductController.getOne)
router.get('/api/v1/product/low_stock', ProductController.getLowStock)
router.get('/api/v1/product', ProductController.get)
router.put('/api/v1/product/:id', putValidation, ProductController.update)
router.patch('/api/v1/product/:id', patchValidation, ProductController.update)
router.delete('/api/v1/product/:id', ProductController.delete)

export default router
