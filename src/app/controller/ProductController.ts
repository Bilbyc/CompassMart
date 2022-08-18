import { IProduct, IProductResponse } from './../interfaces/IProduct';
import ProductService from '../service/ProductService';

class ProductController {
  async create(req, res) {
    try {
      const payload: IProduct = req.body;
      const result = await ProductService.create(payload);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req, res) {
    try {
      const productId: string = req.params.id;
      const payload: IProduct = req.body;
      const result = await ProductService.update(payload, productId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async updatePatch(req, res) {
    try {
      const productId: string = req.params.id;
      const payload: IProduct = req.body;
      const result = await ProductService.patch(payload, productId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async get(req, res){
    try{
      const payload: IProduct = req.query;
      const result = await ProductService.get(payload);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getLowStock(req, res){
    try{
      const result = await ProductService.getLowStock();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getOne(req, res){
    try{
      const productId: string = req.params.id;
      const result = await ProductService.getOne(productId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  
    
}

export default new ProductController();
