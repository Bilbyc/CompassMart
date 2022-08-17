import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

const schema = new Schema<IProduct>({
  name: { type: String, required: true },
  age: { type: Number, required: true }
});

const Product = mongoose.model<IProduct>('Product', schema);

export default Product;
