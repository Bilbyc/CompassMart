import { Readable } from 'stream';
import BadRequestError from '../errors/BadRequestError'
import { Types } from 'mongoose'
import { IProductResponse, IProduct } from '../interfaces/IProduct'
import ProductRepository from '../repository/ProductRepository'
import NotFoundError from '../errors/NotFoundError'
import readline from 'readline'



class ProductService {
  async create (payload: IProduct): Promise<IProductResponse> {
    const foundBarCode = await ProductRepository.getByBarCode(payload.bar_codes)
    if (foundBarCode) {
      throw new BadRequestError('Bar code already exists')
    }

    const result = await ProductRepository.create(payload)
    return result
  }

  async update (payload: IProduct, productId: string): Promise<IProductResponse | null> {
    if (!Types.ObjectId.isValid(productId)) throw new BadRequestError('Not an valid ID');

    const foundProduct = await ProductRepository.getOne(productId)
    if (!foundProduct) {
      throw new NotFoundError('Product doesnt exist or was deleted')
    }
    const foundBarCode = await ProductRepository.getByBarCode(payload.bar_codes)
    if (foundBarCode) {
      throw new BadRequestError('Bar code already exists')
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
    const foundBarCode = await ProductRepository.getByBarCode(payload.bar_codes)
    if (foundBarCode) {
      throw new BadRequestError('Bar code already exists')
    }
    
    payload.stock_control_enabled = payload.qtd_stock > 0
    payload.updatedAt = new Date()

    const result = await ProductRepository.patch(payload, productId)
    return result
  }

  async get (brand:string, department: string, offset: number, limit: number) {
    const result = await ProductRepository.get(brand, department, offset, limit)
    return result
  }

  async getLowStock (offset: number, limit: number) {
    const result = await ProductRepository.getLowStock(offset, limit)
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

  async createCSV (file: any): Promise<any> {
   
    const { buffer } = file

    const readableFile = new Readable();
    readableFile.push(buffer)
    readableFile.push(null)

    const productsLine = readline.createInterface({
    input: readableFile
    })

    const products: any[] = []

    for await(let line of productsLine) {
      const productLineSplit = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      console.log(productLineSplit)
     
      products.push({ 
        title: productLineSplit[0].replace(/["\\]+/g, ''),
        description: productLineSplit[1],
        department: productLineSplit[2],
        brand: productLineSplit[3],
        price: Number(productLineSplit[4].replace(',', '.').replace(/['"]+/g, '')),
        qtd_stock: Number(productLineSplit[5]),
        bar_codes: productLineSplit[6].replace(/["\\]+/g, '')

      })
      
    }
    
    const error: any[] = []
    let errorCounter: number = 0
    let successCounter: number = 0
    
    for (let i = 0; i<products.length; i++){
      let productErrors = 0;
      
      async function checkNullOrUndefined (value: object) {
        if (!value || value === undefined) {
          productErrors++
          errorCounter++
          return true
        } 
      }

      if(await checkNullOrUndefined(products[i].title)) {
        error.push({title: products[i].title, bar_code: products[i].bar_codes, error: 'Title is null or undefined'})}
      
      if(await checkNullOrUndefined(products[i].description)) {
        error.push({title: products[i].title, bar_code: products[i].bar_codes, error: 'Description is null or undefined'})}
      
      if(await checkNullOrUndefined(products[i].department)) {
        error.push({title: products[i].title, bar_code: products[i].bar_codes, error: 'Department is null or undefined'})}
      
      if(await checkNullOrUndefined(products[i].brand)) {
        error.push({title: products[i].title, bar_code: products[i].bar_codes, error: 'Brand is null or undefined'})}
      
      if(await checkNullOrUndefined(products[i].price)) {
        error.push({title: products[i].title, bar_code: products[i].bar_codes, error: 'Price is null or undefined'})}
      
      if(await checkNullOrUndefined(products[i].qtd_stock)) {
        error.push({title: products[i].title, bar_code: products[i].bar_codes, error: 'Qtd Stock is null or undefined'})}

      if(await checkNullOrUndefined(products[i].bar_codes)) {
        error.push({title: products[i].title, bar_code: products[i].bar_codes, error: 'Bar Codes is null or undefined'})}

        
      if(products[i].qtd_stock < 1 || products[i].qtd_stock > 100000) {
        error.push({title: products[i].title, bar_code: products[i].bar_codes, error: 'Stock quantity must be minimum 1 and at max 100000' });
        errorCounter++
        productErrors++
      }
      
      if(products[i].bar_codes.length != 13){
        error.push({title: products[i].title, bar_code: products[i].bar_codes, error: 'bar codes length must be 13'});
        errorCounter++
        productErrors++  
      }

      if(products[i].bar_codes.length == 13 && !products[i].bar_codes.match(/^[0-9]{13}$/)){
        error.push({title: products[i].title, bar_code: products[i].bar_codes, error: 'bar codes must be numbers'});
        errorCounter++
        productErrors++  
      }

      if(products[i].qtd_stock < 0 || products[i].qtd_stock > 100000){
        error.push({title: products[i].title, bar_code: products[i].bar_codes, error: 'stock must be between 0 and 100.000'});
        errorCounter++
        productErrors++
      }

      if(products[i].price < 0.01 || products[i].price > 1000){
        error.push({title: products[i].title, bar_code: products[i].bar_codes, error: 'price must be between 0.01 and 1000'});
        errorCounter++
        productErrors++
      }

      let foundBarCode = await ProductRepository.getByBarCode(products[i].bar_codes)
      if(foundBarCode){
        error.push({title: products[i].title, bar_code: products[i].bar_codes, error: 'bar code already exists'});
        errorCounter++
        productErrors++

      }
      else if (productErrors == 0){
        ProductRepository.create(products[i])
        successCounter++
      }

    }
    
    return {sucess: successCounter, 
      errors: errorCounter, 
      error_details: error
    }
  }

}

export default new ProductService()
