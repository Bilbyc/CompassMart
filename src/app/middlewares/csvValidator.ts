import Logger from '../utils/loggers/winstonConfig'
import { Request, Response, NextFunction } from 'express'

export const csvValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { file } = req

  if (!file) {
    Logger.error('[POST /api/v1/product/csv]: No file was sent')
    return res.status(400).json({
      message: 'Bad Request',
      details: [{
        message: 'No file provided'
      }]
    })
  }

  if (file.mimetype !== 'text/csv') {
    Logger.error('[POST /api/v1/product/csv]: File sent is not a CSV')
    return res.status(400).json({
      message: 'Bad Request',
      details: [{
        message: 'Invalid file type'
      }]
    })
  }

  next()
}
