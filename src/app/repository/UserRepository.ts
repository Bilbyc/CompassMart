import { IUserResponse } from './../interfaces/iUser'
import UserSchema from '../schema/UserSchema'
import { IUser } from '../interfaces/IUser'

class UserRepository {
  async create (payload: IUser): Promise<IUserResponse> {
    return UserSchema.create(payload)
  }
}

export default new UserRepository()
