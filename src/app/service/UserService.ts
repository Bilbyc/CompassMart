import { IUserResponse } from './../interfaces/iUser'
import UserRepository from '../repository/UserRepository'
import { IUser } from '../interfaces/IUser'
import bcrypt from 'bcrypt'
import { createTokenJWT } from '../utils/tokenCreation'
import NotFoundError from '../errors/NotFoundError'

class UserService {
  async create (payload: IUser): Promise<IUserResponse> {
    const passwordHash = await bcrypt.hash(payload.password, 8)
    payload.password = passwordHash
    return UserRepository.create(payload)
  }

  async authenticate (email: string, password: string): Promise<any> {
    const user = await UserRepository.findByEmail(email)
    if (!user) {
      throw new NotFoundError('User not found')
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new Error('Password does not match')
    }
    const token = createTokenJWT(user)
    return { email, token }
  }
}

export default new UserService()
