import { Types } from 'mongoose'

export interface IUser {
  email: string;
  password: string;

}

export interface IUserResponse {
  _id: Types.ObjectId;
  email: string;
  password: string;

}
