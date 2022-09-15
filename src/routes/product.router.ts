import { Router } from 'express'
import ProductController from '../app/controller/ProductController'
import createValidation from '../app/validations/product/create'
import putValidation from '../app/validations/product/put'
import patchValidation from '../app/validations/product/patch'
import multer from 'multer'
import { auth } from '../app/middlewares/auth'
import { csvValidator } from '../app/middlewares/csvValidator'

const router = Router()

const multerConfig = multer()
router.post('/api/v1/product', auth, createValidation, ProductController.create)
router.post('/api/v1/product/csv', auth, multerConfig.single('file'), csvValidator, ProductController.createCSV)
router.get('/api/v1/product/low_stock', auth, ProductController.getLowStock)
router.get('/api/v1/product/marketplace/:id', auth, ProductController.getMapper)
router.get('/api/v1/product/:id', auth, ProductController.getOne)
router.get('/api/v1/product', auth, ProductController.get)
router.patch('/api/v1/product/:id', auth, patchValidation, ProductController.updatePatch)
router.put('/api/v1/product/:id', auth, putValidation, ProductController.update)
router.delete('/api/v1/product/:id', auth, ProductController.delete)

export default router
