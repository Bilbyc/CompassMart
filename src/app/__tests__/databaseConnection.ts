
import ProductSchema from '../schema/ProductSchema'
import UserSchema from '../schema/UserSchema'
import Database from '../../infra/database/mongo/index'
import Logger from '../utils/loggers/winstonConfig'

global.beforeAll(async () => {
  Logger.silent = true
  await Database.connect()
  await UserSchema.deleteMany({})
  await ProductSchema.deleteMany({})
})

global.afterAll(async () => {
  await Database.disconnect()
  Logger.silent = false
})
