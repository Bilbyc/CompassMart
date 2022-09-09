import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import Logger from '../../utils/loggers/winstonConfig'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required()
    })

    const { error } = await schema.validate(req.body, { abortEarly: false })
    if (error) throw error
    return next()
  } catch (error) {
    Logger.error(`[POST /api/v1/user]: ${error}`)
    return res.status(400).json({
      message: 'Bad Request Error',
      errors: error.details.length,
      error: error.details.map(e => e.message)
    })
  }
}
