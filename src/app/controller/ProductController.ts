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
}

export default new ProductController();
