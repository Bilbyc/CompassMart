import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      department: Joi.string(),
      brand: Joi.string(),
      price: Joi.number().min(0.01).max(1000),
      qtd_stock: Joi.number().min(0).less(100001),
      bar_codes: Joi.string().length(13)
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      message: 'Bad Request Error',
      errors: error.details.length,
      error: error.details.map(e => e.message)
    });
  }
};
