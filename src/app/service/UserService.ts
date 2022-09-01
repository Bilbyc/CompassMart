import { IUserResponse } from './../interfaces/iUser'
import UserRepository from '../repository/UserRepository'
import { IUser } from '../interfaces/IUser'

class UserService {
  async create (payload: IUser): Promise<IUserResponse> {
    return UserRepository.create(payload)
  }
}

export default new UserService()
