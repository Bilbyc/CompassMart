/* eslint-disable no-undef */
import App from '../../../app'
import request from 'supertest'

let token

const testProduct = {
  title: 'Refrigerante',
  description: 'Pepsi Cola 600ml',
  department: 'Depósitos',
  brand: 'Pepsi',
  price: 5.50,
  qtd_stock: 900,
  bar_codes: '1234567891000'
}

const productForPost = {
  title: 'Refrigerante',
  description: 'Coca Cola 600ml',
  department: 'Depósitos',
  brand: 'Coca cola',
  price: 5.50,
  qtd_stock: 866,
  bar_codes: '1234567891011'
}

const inBaseProduct = {
  title: 'Batata frita',
  description: 'Pepsi Cola 600ml',
  department: 'Depósitos',
  brand: 'Pepsi',
  price: 5.50,
  qtd_stock: 900,
  bar_codes: '1234567891888'
}

beforeAll(async () => {
  const login = await request(App).post('/api/v1/user').send({
    email: 'carlos.test@gmail.com',
    password: '12345'
  })

  const authenticate = await request(App).post('/api/v1/authenticate').send({
    email: login.body.email,
    password: '12345'
  })

  token = authenticate.body.token

  await request(App).post('/api/v1/product')
    .set('Authorization', `Bearer ${authenticate.body.token}`)
    .send(inBaseProduct)
})

describe('Products Service', () => {
  describe('POST /product', () => {
    it('should return 201 - and create a product', async () => {
      const response = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(productForPost)

      await request(App).delete(`/api/v1/product/${response.body._id}`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('_id')
    })

    it('should return 400 Bad Request - bar codes already exists', async () => {
      const response = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send({
          title: 'Refrigerante',
          description: 'Coca Cola 600ml',
          department: 'Depósitos',
          brand: 'Coca cola',
          price: 5.50,
          qtd_stock: 866,
          bar_codes: inBaseProduct.bar_codes
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('details')
    })

    it('should return 400 Bad Request - missing required property', async () => {
      const response = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Refrigerante',
          description: 'Coca Cola 600ml',
          department: 'Depósitos',
          price: 5.50,
          qtd_stock: 866,
          bar_codes: '1234567891088'
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('details')
    })

    it('should return 400 Bad Request - field cant be empty', async () => {
      const response = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: '',
          description: 'Coca Cola 600ml',
          department: 'Depósitos',
          brand: 'Coca cola',
          price: 5.50,
          qtd_stock: 866,
          bar_codes: '1234567891013'
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('details')
    })
  })

  describe('GET /product', () => {
    it('should return 200 OK', async () => {
      const res = await request(App).get('/api/v1/product')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(200)
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const res = await request(App).get('/api/v1/product')

      expect(res.status).toEqual(401)
    })

    it('should return 200 - adding limit and offset query', async () => {
      const res = await request(App).get('/api/v1/product?limit=1&offset=1')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(200)
    })
  })

  describe('GET /product/:id', () => {
    it('should return 200 OK', async () => {
      const product = await request(App).post('/api/v1/product').set('Authorization', `Bearer ${token}`).send(testProduct)

      const res = await request(App).get(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`)

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const product = await request(App).post('/api/v1/product').set('Authorization', `Bearer ${token}`).send(testProduct)

      const res = await request(App).get(`/api/v1/product/${product.body._id}`)

      expect(res.status).toEqual(401)

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
    })

    it('should return 400 Bad Request - passing an invalid ID', async () => {
      const res = await request(App).get('/api/v1/product/123')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(400)
    })

    it('should return 404 Not Found - passing a valid but inexistent ID', async () => {
      const res = await request(App).get('/api/v1/product/5e9f1b9b9b9b9b9b9b9b9b9b')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(404)
    })
  })

  describe('GET /product/marketplace/:id', () => {
    it('should return 200 OK', async () => {
      const product = await request(App).post('/api/v1/product').set('Authorization', `Bearer ${token}`)
        .send(testProduct)

      const res = await request(App).get(`/api/v1/product/marketplace/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`)

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('walmart')
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const product = await request(App).post('/api/v1/product').set('Authorization', `Bearer ${token}`)
        .send(testProduct)

      const res = await request(App).get(`/api/v1/product/marketplace/${product.body._id}`)

      expect(res.status).toEqual(401)

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
    })

    it('should return 400 Bad Request - passing an invalid ID', async () => {
      const res = await request(App).get('/api/v1/product/marketplace/123')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(400)
    })

    it('should return 404 Not Found - passing a valid but inexistent ID', async () => {
      const res = await request(App).get('/api/v1/product/marketplace/5e9f1b9b9b9b9b9b9b9b9b9b')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(404)
    })
  })

  describe('GET /product/low_stock', () => {
    it('should return 200 OK', async () => {
      const res = await request(App).get('/api/v1/product/low_stock')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(200)
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const res = await request(App).get('/api/v1/product/low_stock')
      expect(res.status).toEqual(401)
    })

    it('should return 200 - adding limit and offset query', async () => {
      const res = await request(App).get('/api/v1/product/low_stock?limit=1&offset=1')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(200)
    })
  })

  describe('PUT /product/:id', () => {
    it('should return 200 OK', async () => {
      const product = await request(App).post('/api/v1/product').set('Authorization', `Bearer ${token}`).send(testProduct)

      const res = await request(App).put(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`).send({
          title: testProduct.title,
          description: testProduct.description,
          department: 'Mercearia',
          brand: testProduct.brand,
          price: testProduct.price,
          qtd_stock: 900,
          bar_codes: testProduct.bar_codes
        })

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
    })

    it('Should return 400 Bad Request - bar codes already exists', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProduct)

      const res = await request(App).put(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: testProduct.title,
          description: testProduct.description,
          department: 'Mercearia',
          brand: testProduct.brand,
          price: testProduct.price,
          qtd_stock: 900,
          bar_codes: inBaseProduct.bar_codes
        })
      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(400)
      expect(res.body).toHaveProperty('details')
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProduct)

      const res = await request(App).put(`/api/v1/product/${product.body._id}`)
        .send({
          title: testProduct.title,
          description: testProduct.description,
          department: 'Mercearia',
          brand: testProduct.brand,
          price: testProduct.price,
          qtd_stock: 900,
          bar_codes: '1234567891011'
        })

      expect(res.status).toEqual(401)

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
    })

    it('should return 400 Bad Request - passing an invalid ID', async () => {
      const res = await request(App).put('/api/v1/product/123')
        .set('Authorization', `Bearer ${token}`).send({
          title: testProduct.title,
          description: testProduct.description,
          department: 'Mercearia',
          brand: testProduct.brand,
          price: testProduct.price,
          qtd_stock: 900,
          bar_codes: testProduct.bar_codes
        })

      expect(res.status).toEqual(400)
    })

    it('should return 404 Not Found - passing a valid but inexistent ID', async () => {
      const res = await request(App).put('/api/v1/product/5e9f1b9b9b9b9b9b9b9b9b9b')
        .set('Authorization', `Bearer ${token}`).send({
          title: testProduct.title,
          description: testProduct.description,
          department: 'Mercearia',
          brand: testProduct.brand,
          price: 8.90,
          qtd_stock: 900,
          bar_codes: testProduct.bar_codes
        })

      expect(res.status).toEqual(404)
    })

    it('should return 400 Bad Request - missing a required properties', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProduct)

      const res = await request(App).put(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`).send({
          title: testProduct.title,
          description: testProduct.description,
          qtd_stock: 900,
          bar_codes: testProduct.bar_codes
        })

      expect(res.status).toEqual(400)
      expect(res.body).toHaveProperty('details')

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
    })

    it('should return 400 Bad Request - field not allowed to be empty', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProduct)

      const res = await request(App).put(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: '',
          description: testProduct.description,
          department: '',
          brand: testProduct.brand,
          price: '',
          qtd_stock: '',
          bar_codes: testProduct.bar_codes
        })

      expect(res.status).toEqual(400)
      expect(res.body).toHaveProperty('details')

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
    })
  })

  describe('PATCH /product/:id', () => {
    it('should return 200 OK', async () => {
      const product = await request(App).post('/api/v1/product').set('Authorization', `Bearer ${token}`).send(testProduct)

      const res = await request(App).patch(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`).send({
          title: 'Suco de Frutas',
          department: 'Depósitos'
        })

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
    })

    it('Should return 400 Bad Request - bar codes already exists', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProduct)

      const res = await request(App).patch(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          bar_codes: inBaseProduct.bar_codes
        })

      expect(res.status).toEqual(400)
      expect(res.body).toHaveProperty('details')

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProduct)

      const res = await request(App).patch(`/api/v1/product/${product.body._id}`)
        .send({
          brand: 'Fanta',
          price: 5.50,
          qtd_stock: 120
        })

      expect(res.status).toEqual(401)

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
    })

    it('should return 400 Bad Request - passing an invalid ID', async () => {
      const res = await request(App).patch('/api/v1/product/123')
        .set('Authorization', `Bearer ${token}`).send({
          brand: 'Fanta',
          price: 5.50,
          qtd_stock: 120
        })

      expect(res.status).toEqual(400)
    })

    it('should return 404 Not Found - passing a valid but inexistent ID', async () => {
      const res = await request(App).patch('/api/v1/product/5e9f1b9b9b9b9b9b9b9b9b9b')
        .set('Authorization', `Bearer ${token}`).send({
          brand: 'Fanta',
          price: 5.50,
          qtd_stock: 120
        })

      expect(res.status).toEqual(404)
    })

    it('should return 400 Bad Request - field not allowed to be empty', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProduct)

      const res = await request(App).patch(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          brand: '',
          price: 5.50,
          qtd_stock: 120
        })

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(400)
    })
  })

  describe('DELETE /product/:id', () => {
    it('should return 204 No content', async () => {
      const product = await request(App).post('/api/v1/product').set('Authorization', `Bearer ${token}`).send(testProduct)

      const res = await request(App).delete(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(204)
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProduct)

      const res = await request(App).delete(`/api/v1/product/${product.body._id}`)

      expect(res.status).toEqual(401)
    })

    it('should return 400 Bad Request - passing an invalid ID', async () => {
      const res = await request(App).delete('/api/v1/product/123')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(400)
    })

    it('should return 404 Not Found - passing a valid but inexistent ID', async () => {
      const res = await request(App).delete('/api/v1/product/5e9f1b9b9b9b9b9b9b9b9b9b')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(404)
    })
  })
})
