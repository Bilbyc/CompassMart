import { IProductResponse, IProduct } from '../interfaces/IProduct'
import ProductRepository from '../repository/ProductRepository'

class ProductService {
  async create (payload: IProduct): Promise<IProductResponse> {
    const result = await ProductRepository.create(payload)
    return result
  }

  async update (payload: IProduct, productId: string): Promise<IProductResponse | null> {
    payload.stock_control_enabled = payload.qtd_stock > 0
    payload.updatedAt = new Date()

    const result = await ProductRepository.update(payload, productId)
    return result
  }

  async patch (payload: IProduct, productId: string): Promise<IProductResponse | null> {
    payload.stock_control_enabled = payload.qtd_stock > 0
    payload.updatedAt = new Date()

    const result = await ProductRepository.patch(payload, productId)
    return result
  }

  async get (payload: IProduct, page) {
    const result = await ProductRepository.get(payload, page)
    return result
  }

  async getLowStock () {
    const result = await ProductRepository.getLowStock()
    return result
  }

  async getOne (productId: string) {
    const result = await ProductRepository.getOne(productId)
    return result
  }

  async delete (productId: string) {
    const result = await ProductRepository.delete(productId)
    return result
  }
}

export default new ProductService()
