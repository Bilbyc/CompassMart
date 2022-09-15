import { Request, Response, NextFunction } from 'express'

export const csvValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { file } = req

  if (!file) {
    return res.status(400).json({
      message: 'Bad Request',
      details: [{
        message: 'No file provided'
      }]
    })
  }

  if (file.mimetype !== 'text/csv') {
    return res.status(400).json({
      message: 'Bad Request',
      details: [{
        message: 'Invalid file type'
      }]
    })
  }

  next()
}
