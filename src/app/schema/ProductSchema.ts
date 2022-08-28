import mongoose, { PaginateModel, Schema } from 'mongoose'
import { IProduct } from '../interfaces/IProduct'
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  qtd_stock: { type: Number, required: true },
  stock_control_enabled: { type: Boolean, default: true },
  bar_codes: { type: String, required: true, length: 13, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { versionKey: false })

schema.plugin(mongoosePaginate)

const Product = mongoose.model<IProduct, PaginateModel<IProduct>>('Product', schema)

export default Product
