import { IUser } from './../interfaces/iUser'
import jwt from 'jsonwebtoken'

export function createTokenJWT (user: IUser) {
  const payload = {
    email: user.email
  }

  const token = jwt.sign(payload, 'senha-secreta', { expiresIn: '1h' })
  return token
}
