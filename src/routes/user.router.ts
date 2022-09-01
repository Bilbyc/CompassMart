import UserController from '../app/controller/UserController'
import { Router } from 'express'
import createValidation from '../app/validations/user/create'

const router = Router()

router.post('/api/v1/authenticate', createValidation, UserController.create)

export default router
