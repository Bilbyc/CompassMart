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
      totalPages: 'offsets',
      page: 'offset',
      nextPage: false,
      prevPage: false,
      pagingCounter: false,
      hasPrevPage: false,
      hasNextPage: false
    };
    
    const options = {
      page: page || 1,
      limit: 50,
      customLabels: myCustomLabels,
    };
    return ProductSchema.paginate({ $and: [payload, { stock_control_enabled: true }]}, options)
    
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

  async createCSV (products: IProduct): Promise<Array<object>> {
    return ProductSchema.insertMany(products);
  }

  async getByBarCode (barCode: string): Promise<IProductResponse | null> {
    return ProductSchema.findOne({bar_codes: barCode})
  }

  
}

export default new ProductRepository()
