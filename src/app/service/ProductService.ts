import { IProductResponse, IProduct } from '../interfaces/IProduct';
import ProductRepository from '../repository/ProductRepository';

class ProductService {
  async create(payload: IProduct): Promise<IProductResponse> {
    const result = await ProductRepository.create(payload);
    return result;
  }

  async update(payload: IProduct, productId: string): Promise<IProductResponse> {
    payload.stock_control_enabled = payload.qtd_stock > 0 ? true : false;
    payload.updatedAt = new Date();

    const result = await ProductRepository.update(payload, productId);
    return result;
  }  
  
  async updateOne(payload: IProduct, productId: string): Promise<IProductResponse> {
    payload.stock_control_enabled = payload.qtd_stock > 0 ? true : false;
    payload.updatedAt = new Date();

    const result = await ProductRepository.updateOne(payload, productId);
    return result;
  }

  async get() {
    const result = await ProductRepository.get();
    return result;
  }

  async getLowStock() {
    const result = await ProductRepository.getLowStock();
    return result;
  }
}

export default new ProductService();
