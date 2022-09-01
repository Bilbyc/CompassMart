import { IUser, IUserResponse } from '../interfaces/IUser'
import UserService from '../service/UserService'

class UserController {
  async create (req, res): Promise<IUserResponse> {
    try {
      const payload: IUser = req.body
      const result = await UserService.create(payload)

      return res.status(201).json(result)
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }
}

export default new UserController()
