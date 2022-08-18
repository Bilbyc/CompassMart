import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

const schema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  qtd_Stock: { type: Number, required: true },
  bar_codes: { type: String, required: true }
});

const Product = mongoose.model<IProduct>('Product', schema);

export default Product;
