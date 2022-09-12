import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes/index.router'
import morgan from './app/utils/loggers/morganConfig'
import SwaggerUI from 'swagger-ui-express'
import swaggerDocument from '../src/app/documentation/swagger.json'
import './infra/database/mongo/index'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

class App {
  public server: express.Application

  public constructor () {
    this.server = express()
    this.middlewares()
    this.routes()
  }

  public init (): express.Application {
    return this.server
  }

  private middlewares (): void {
    this.server.use(express.json({}))
    this.server.use(
      express.urlencoded({
        extended: true
      })
    )
    this.server.use(cors())
    this.server.use(morgan)
    this.server.use('/api/v1/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocument))
  }

  private routes (): void {
    this.server.use(...routes)
  }
}

export default new App().init()
