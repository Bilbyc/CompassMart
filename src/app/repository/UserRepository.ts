import { IUserResponse, IUser } from './../interfaces/IUser'
import UserSchema from '../schema/UserSchema'
class UserRepository {
  async create (payload: IUser): Promise<IUserResponse> {
    return UserSchema.create(payload)
  }

  async findByEmail (email: string): Promise<IUserResponse | null> {
    return UserSchema.findOne({ email })
  }
}

export default new UserRepository()
