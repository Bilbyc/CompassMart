import { Types } from 'mongoose';

export interface IProduct {
  title: string;
  description: string;
  brand: string;
  department: string;
  price: number;
  qtd_Stock: number;
  bar_codes: string;
}

export interface IProductResponse {
  title: string;
  description: string;
  department: string;
  brand: string;
  price: number;
  qtd_Stock: number;
  bar_codes: string;
  _id: Types.ObjectId;
  __v?: number;
}
