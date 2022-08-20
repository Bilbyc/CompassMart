import { Types } from 'mongoose'

export interface IProduct {
  title: string;
  description: string;
  brand: string;
  department: string;
  price: number;
  qtd_stock: number;
  stock_control_enabled: boolean;
  bar_codes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductResponse {
  _id: Types.ObjectId;
  title: string;
  description: string;
  department: string;
  brand: string;
  price: number;
  qtd_stock: number;
  stock_control_enabled: boolean;
  bar_codes: string;
  createdAt: Date;
  updatedAt: Date;
}
