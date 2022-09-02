import { IUserResponse } from './../interfaces/iUser'
import jwt from 'jsonwebtoken'

export function createTokenJWT (user: IUserResponse) {
  const payload = {
    id: user._id
  }

  const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '1h' })
  return token
}
