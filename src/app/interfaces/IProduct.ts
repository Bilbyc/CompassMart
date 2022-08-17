import { Types } from 'mongoose';

export interface IProduct {
  name: string;
  age: number;
}

export interface IProductResponse {
  name: string;
  age: number;
  _id: Types.ObjectId;
  __v?: number;
}
