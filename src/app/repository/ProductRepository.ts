import { IProduct, IProductResponse } from '../interfaces/IProduct';
import ProductSchema from '../schema/ProductSchema';

class ProductRepository {
  async create(payload: IProduct): Promise<IProductResponse> {
    return ProductSchema.create(payload);
  }

  async update(payload: IProduct, productID: string): Promise<IProductResponse | null> {
    return ProductSchema.findByIdAndUpdate(productID, payload, { new: true });
  }

  async updateOne(payload: IProduct, productID: string): Promise<IProductResponse | null> {
    return ProductSchema.findByIdAndUpdate(productID, payload, { new: true });
  }

  async get() {
    return ProductSchema.find({ stock_control_enabled: true });
  }

  async getLowStock() {
    return ProductSchema.find({ qtd_stock: { $lt: 100 }, stock_control_enabled: true }).sort({ qtd_stock: 'asc' });
  }
}

export default new ProductRepository();
