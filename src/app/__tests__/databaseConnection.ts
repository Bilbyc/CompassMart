
import ProductSchema from '../schema/ProductSchema'
import UserSchema from '../schema/UserSchema'
import Database from '../../infra/database/mongo/index'

global.beforeAll(async () => {
  await Database.connect()
  await ProductSchema.deleteMany({})
  await UserSchema.deleteMany({})
})

global.afterAll(async () => {
  await ProductSchema.deleteMany({})
  await UserSchema.deleteMany({})
  await Database.disconnect()
})
