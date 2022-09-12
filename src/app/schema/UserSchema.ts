import mongoose, { Schema } from 'mongoose'
import { IUser } from '../interfaces/IUser'

const schema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true }
}, { versionKey: false })

const User = mongoose.model<IUser>('User', schema)

export default User
