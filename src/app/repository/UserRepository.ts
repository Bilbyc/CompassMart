import { IUserResponse } from './../interfaces/iUser'
import UserSchema from '../schema/UserSchema'
import { IUser } from '../interfaces/IUser'

class UserRepository {
  async create (payload: IUser): Promise<IUserResponse> {
    return UserSchema.create(payload)
  }

  async findByEmail (email: string): Promise<IUserResponse | null> {
    return UserSchema.findOne({ email })
  }
}

export default new UserRepository()
