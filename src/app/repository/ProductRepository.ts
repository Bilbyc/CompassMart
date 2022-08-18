import { IProduct, IProductResponse } from '../interfaces/IProduct';
import ProductSchema from '../schema/ProductSchema';

class ProductRepository {
  async create(payload: IProduct): Promise<IProductResponse> {
    return ProductSchema.create(payload);
  }

  async update(payload: IProduct, productID: string): Promise<any> {
    return ProductSchema.findByIdAndUpdate(productID, payload, { new: true });
  }

  async updateOne(payload: IProduct, productID: string): Promise<any> {
    return ProductSchema.findByIdAndUpdate(productID, payload, { new: true });
  }

  async get() {
    return ProductSchema.find({ stock_control_enabled: true });
  }

  async getLowStock() {
    return ProductSchema.find();
  }
}

export default new ProductRepository();
