import { Readable } from 'stream';
import BadRequestError from '../errors/BadRequestError'
import { Types } from 'mongoose'
import { IProductResponse, IProduct } from '../interfaces/IProduct'
import ProductRepository from '../repository/ProductRepository'
import NotFoundError from '../errors/NotFoundError'
import readline from 'readline'


class ProductService {
  async create (payload: IProduct): Promise<IProductResponse> {

    const result = await ProductRepository.create(payload)
    return result
  }

  async update (payload: IProduct, productId: string): Promise<IProductResponse | null> {
    if (!Types.ObjectId.isValid(productId)) throw new BadRequestError('Not an valid ID');

    const foundProduct = await ProductRepository.getOne(productId)
    if (!foundProduct) {
      throw new NotFoundError('Product doesnt exist or was deleted')
    }

    payload.stock_control_enabled = payload.qtd_stock > 0
    payload.updatedAt = new Date()

    const result = await ProductRepository.update(payload, productId)
    return result
  }

  async patch (payload: IProduct, productId: string): Promise<IProductResponse | null> {
     if (!Types.ObjectId.isValid(productId)) throw new BadRequestError('Not an valid ID');

    const foundProduct = await ProductRepository.getOne(productId)
    if (!foundProduct) {
      throw new NotFoundError('Product doesnt exist or was deleted')
    }
    
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
    if (!Types.ObjectId.isValid(productId)) throw new BadRequestError('Not an valid ID');

    const foundProduct = await ProductRepository.getOne(productId)
    if (!foundProduct) {
      throw new NotFoundError('Product doesnt exist or was deleted')
    }
    
    const result = await ProductRepository.getOne(productId)
    return result
  }

  async delete (productId: string) {
    if (!Types.ObjectId.isValid(productId)) throw new BadRequestError('Not an valid ID');

    const foundProduct = await ProductRepository.getOne(productId)
    if (!foundProduct) {
      throw new NotFoundError('Product doesnt exist')
    }

    const result = await ProductRepository.delete(productId)
    return result
  }

  ///////////////////
  async createCSV (file: any): Promise<IProduct> {
    
    const { buffer } = file

    const readableFile = new Readable();
    readableFile.push(buffer)
    readableFile.push(null)

    const producstLine = readline.createInterface({
    input: readableFile
    })

    const products: any[] = []

    for await(let line of producstLine) {
      const productLineSplit = line.split(",")
      console.log(productLineSplit[1])
        
      products.push({ 
        title: productLineSplit[0],
        description: productLineSplit[1],
        department: productLineSplit[2],
        brand: productLineSplit[3],
        price: Number(productLineSplit[4]),
        qtd_stock: Number(productLineSplit[5]),
        bar_codes: productLineSplit[6]

      })
    }

    //console.log(products)

    const result = await ProductRepository.createCSV(products)
    return result;
  }
}

export default new ProductService()
