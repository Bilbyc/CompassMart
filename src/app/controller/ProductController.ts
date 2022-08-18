import ProductService from '../service/ProductService';

class ProductController {
  async create(req, res) {
   // try {
      const payload = req.body;
      //const result = await ProductService.create(payload);
      return console.log('ola');
   // } catch (error) {
   //   return res.status(500).json({ error });
    //}
  }
}

export default new ProductController();
