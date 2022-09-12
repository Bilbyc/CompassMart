import { IUserResponse } from './../interfaces/IUser'
import jwt from 'jsonwebtoken'

export function createTokenJWT (user: IUserResponse) {
  const payload = {
    id: user._id
  }

  const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '1d' })
  return token
}
