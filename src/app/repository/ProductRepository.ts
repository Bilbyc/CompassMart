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

  async get (brand: string, department: string, offset: number, limit: number) {
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
    }

    const options = {
      page: offset || 1,
      limit: limit || 50,
      customLabels: myCustomLabels
    }

    return ProductSchema.paginate({
      $and: [{ brand: new RegExp(brand, 'i') }, { department: new RegExp(department, 'i') },
        { stock_control_enabled: true }]
    }, options)
  }

  async getLowStock (offset: number, limit: number) {
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
    }

    const options = {
      page: offset || 1,
      limit: limit || 50,
      customLabels: myCustomLabels,
      sort: { qtd_stock: 'asc' }
    }

    return ProductSchema.paginate({ $and: [{ qtd_stock: { $lt: 100 } }, { stock_control_enabled: true }] }, options)
  }

  async getOne (productId: string): Promise<IProductResponse | null> {
    return ProductSchema.findById(productId)
  }

  async delete (productId: string) {
    return ProductSchema.findByIdAndDelete(productId)
  }

  async createCSV (products: IProduct): Promise<Array<object>> {
    return ProductSchema.insertMany(products)
  }

  async getByBarCode (barCode: string): Promise<IProductResponse | null> {
    return ProductSchema.findOne({ bar_codes: barCode })
  }
}

export default new ProductRepository()
