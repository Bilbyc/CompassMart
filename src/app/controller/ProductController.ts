import { IProduct } from './../interfaces/IProduct';
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
}

export default new ProductController();
