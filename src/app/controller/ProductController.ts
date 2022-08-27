import { IProduct } from './../interfaces/IProduct'
import ProductService from '../service/ProductService'

class ProductController {
  async create (req, res) {
    try {
      const payload: IProduct = req.body
      const result = await ProductService.create(payload)
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async update (req, res) {
    try {
      const productId: string = req.params.id
      const payload: IProduct = req.body
      const result = await ProductService.update(payload, productId)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(error.statusCode||500).json({ 
        message: error.name,
        details: [
          { message: error.message}
        ]
       })
    }
  }

  async updatePatch (req, res) {
    try {
      const productId: string = req.params.id
      const payload: IProduct = req.body
      const result = await ProductService.patch(payload, productId)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(error.statusCode||500).json({ 
        message: error.name,
        details: [
          { message: error.message}
        ]
       })
    }
  }

  async get (req, res) {
    try {
      const offset = parseInt(req.query.offset)
      const brand: string = req.query.brand
      const department: string = req.query.department
      const result = await ProductService.get(brand, department, offset)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async getLowStock (req, res) {
    try {
      const offset = parseInt(req.query.offset)
      const result = await ProductService.getLowStock(offset)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async getOne (req, res) {
    try {
      const productId: string = req.params.id
      const result = await ProductService.getOne(productId)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(error.statusCode||500).json({ 
        message: error.name,
        details: [
          { message: error.message}
        ]
       })
    }
  }

  async delete (req, res) {
    try {
      const productId: string = req.params.id
      await ProductService.delete(productId)

      return res.status(204).json()
    } catch (error) {
      return res.status(error.statusCode||500).json({ 
        message: error.name,
        details: [
          { message: error.message}
        ]
       })
    }
  }

  //////////////////////
  async createCSV (req, res) {
    try {
      const { file } = req
      
      const result = await ProductService.createCSV(file)
  
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    } 
  }
}

export default new ProductController()


