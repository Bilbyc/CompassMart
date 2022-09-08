import Logger from './app/utils/loggers/winstonConfig'
import App from './app'

const app = new App()

app.init().listen(process.env.PORT || 3000, () => {
  Logger.debug(`App starting at http://localhost:${process.env.PORT}`)
  Logger.debug(`Envs: ${process.env.TARGET || 'local'}`)
})
