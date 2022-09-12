import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

class Database {
  constructor () {
    this.connect()
  }

  connect () {
    return mongoose.connect(
      process.env.MONGO_DB_URL || 'mongodb://localhost:27017/bolsista'
    )
  }

  disconnect () {
    return mongoose.disconnect()
  }
}

export default new Database()
