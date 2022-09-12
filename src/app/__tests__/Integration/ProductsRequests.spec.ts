/* eslint-disable no-undef */
import App from '../../../app'
import request from 'supertest'

let token

let InDBProduct

const testProduct = {
  title: 'Refrigerante',
  description: 'Coca Cola 600ml',
  department: 'Depósitos',
  brand: 'Coca cola',
  price: 5.50,
  qtd_stock: 866,
  bar_codes: '1234567891011'
}

const testProductTwo = {
  title: 'Refrigerante',
  description: 'Pepsi Cola 600ml',
  department: 'Depósitos',
  brand: 'Pepsi',
  price: 5.50,
  qtd_stock: 900,
  bar_codes: '1234567891000'
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

  InDBProduct = await request(App).post('/api/v1/product').set('Authorization', `Bearer ${authenticate.body.token}`).send(testProduct)

  token = authenticate.body.token
})

describe('Products Service', () => {
  describe('POST /product', () => {
    it('should return 201 - and create a product', async () => {
      const response = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProductTwo)

      await request(App).delete(`/api/v1/product/${response.body._id}`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('_id')
    })

    it('should return 400 Bad Request - bar codes already exists', async () => {
      const response = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProduct)

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
      expect(response.body).toHaveProperty('error')
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
      expect(response.body).toHaveProperty('error')
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
      const product = await request(App).post('/api/v1/product').set('Authorization', `Bearer ${token}`).send(testProductTwo)

      const res = await request(App).get(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`)

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const product = await request(App).post('/api/v1/product').set('Authorization', `Bearer ${token}`).send(testProductTwo)

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
      const product = await request(App).post('/api/v1/product').set('Authorization', `Bearer ${token}`).send(testProductTwo)

      const res = await request(App).put(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`).send({
          title: 'Refrigerante',
          description: 'Coca Cola 600ml',
          department: 'Depósitos',
          brand: 'Coca cola',
          price: 5.50,
          qtd_stock: 866,
          bar_codes: '1234567891013'
        })

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
    })

    it('Should return 400 Bad Request - bar codes already exists', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProductTwo)

      const res = await request(App).put(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Refrigerante Cola',
          description: 'Coca Cola 900ml',
          department: 'Depósitos',
          brand: 'Coca cola',
          price: 5.50,
          qtd_stock: 700,
          bar_codes: InDBProduct.body.bar_codes
        })
      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(400)
      expect(res.body).toHaveProperty('details')
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProductTwo)

      const res = await request(App).put(`/api/v1/product/${product.body._id}`)
        .send({
          title: 'Refrigerante',
          description: 'Coca Cola 600ml',
          department: 'Depósitos',
          brand: 'Coca cola',
          price: 5.50,
          qtd_stock: 866,
          bar_codes: '1234567891011'
        })

      expect(res.status).toEqual(401)

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
    })

    it('should return 400 Bad Request - passing an invalid ID', async () => {
      const res = await request(App).put('/api/v1/product/123')
        .set('Authorization', `Bearer ${token}`).send({
          title: 'Refrigerante',
          description: 'Coca Cola 600ml',
          department: 'Depósitos',
          brand: 'Coca cola',
          price: 5.50,
          qtd_stock: 866,
          bar_codes: '1234567891011'
        })

      expect(res.status).toEqual(400)
    })

    it('should return 404 Not Found - passing a valid but inexistent ID', async () => {
      const res = await request(App).put('/api/v1/product/5e9f1b9b9b9b9b9b9b9b9b9b')
        .set('Authorization', `Bearer ${token}`).send({
          title: 'Refrigerante',
          description: 'Coca Cola 600ml',
          department: 'Depósitos',
          brand: 'Coca cola',
          price: 5.50,
          qtd_stock: 866,
          bar_codes: '1234567891011'
        })

      expect(res.status).toEqual(404)
    })

    it('should return 400 Bad Request - missing a required property', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProductTwo)

      const res = await request(App).put(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`).send({
          title: 'Refrigerante',
          description: 'Coca Cola 600ml',
          brand: 'Coca cola',
          price: 5.50,
          qtd_stock: 866,
          bar_codes: '1234567891011'
        })

      expect(res.status).toEqual(400)
      expect(res.body).toHaveProperty('error')

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
    })

    it('should return 400 Bad Request - field not allowed to be empty', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProductTwo)

      const res = await request(App).put(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: '',
          description: 'Coca Cola 600ml',
          department: 'Depósitos',
          brand: 'Coca cola',
          price: 5.50,
          qtd_stock: 866,
          bar_codes: '1234567891011'
        })

      expect(res.status).toEqual(400)
      expect(res.body).toHaveProperty('error')

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
    })
  })

  describe('PATCH /product/:id', () => {
    it('should return 200 OK', async () => {
      const product = await request(App).post('/api/v1/product').set('Authorization', `Bearer ${token}`).send(testProductTwo)

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
        .set('Authorization', `Bearer ${token}`).send(testProductTwo)

      const res = await request(App).patch(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          bar_codes: InDBProduct.body.bar_codes
        })

      expect(res.status).toEqual(400)
      expect(res.body).toHaveProperty('details')

      await request(App).delete(`/api/v1/product/${product.body._id}`).set('Authorization', `Bearer ${token}`)
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProductTwo)

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
        .set('Authorization', `Bearer ${token}`).send(testProductTwo)

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
      const product = await request(App).post('/api/v1/product').set('Authorization', `Bearer ${token}`).send(testProductTwo)

      const res = await request(App).delete(`/api/v1/product/${product.body._id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(204)
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const product = await request(App).post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProductTwo)

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
