import UserSchema from '../schema/UserSchema'
import { IUser } from '../interfaces/IUser'

class UserRepository {
  async create (payload: IUser): Promise<IUser> {
    return UserSchema.create(payload)
  }
}

export default new UserRepository()
