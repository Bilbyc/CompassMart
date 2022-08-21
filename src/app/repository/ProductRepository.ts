import { IProduct, IProductResponse } from '../interfaces/IProduct'
import ProductSchema from '../schema/ProductSchema'

class ProductRepository {
  async create (payload: IProduct): Promise<IProductResponse> {
    return ProductSchema.create(payload)
  }

  async update (payload: IProduct, productID: string): Promise<IProductResponse | null> {
    return ProductSchema.findByIdAndUpdate(productID, payload, { new: true })
  }

  async patch (payload: IProduct, productID: string): Promise<IProductResponse | null> {
    return ProductSchema.findByIdAndUpdate(productID, payload, { new: true })
  }

  async get (payload: IProduct, page) {
    
    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'Products',
      limit: 'limit',
      page: 'offset',
      nextPage: 'false',
      prevPage: 'false',
      totalPages: 'offsets',
      pagingCounter: 'false'
      
    };
    
    const options = {
      page: page || 1,
      limit: 50,
      query: { payload },
      customLabels: myCustomLabels,
    };
    const validStockProducts = ProductSchema.find({ stock_control_enabled: true })
    const result = validStockProducts.find(payload)
    
    return ProductSchema.paginate( result , options)
  }

  async getLowStock () {
    return ProductSchema.find({ qtd_stock: { $lt: 100 }, stock_control_enabled: true }).sort({ qtd_stock: 'asc' })
  }

  async getOne (productId: string) {
    return ProductSchema.findById(productId)
  }

  async delete (productId: string) {
    return ProductSchema.findByIdAndDelete(productId)
  }
}

export default new ProductRepository()
