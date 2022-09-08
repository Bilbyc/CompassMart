import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import Logger from '../../utils/loggers/winstonConfig'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      title: Joi.string().disallow(null),
      description: Joi.string().disallow(null),
      department: Joi.string().disallow(null),
      brand: Joi.string().disallow(null),
      price: Joi.number().min(0.01).max(1000).disallow(null),
      qtd_stock: Joi.number().min(0).max(100000).disallow(null),
      bar_codes: Joi.string().length(13).disallow(null)
    })

    const { error } = await schema.validate(req.body, { abortEarly: false })
    if (error) throw error
    return next()
  } catch (error) {
    Logger.error(`[PATCH /api/v1/product/:id]: Product (ID:${req.params.id}) ${error}`)
    return res.status(400).json({
      message: 'Bad Request Error',
      errors: error.details.length,
      error: error.details.map(e => e.message)
    })
  }
}
