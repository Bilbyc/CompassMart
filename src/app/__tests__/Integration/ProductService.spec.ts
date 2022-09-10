/* eslint-disable no-undef */
import App from '../../../app'
import request from 'supertest'

const server = request(App)

jest.setTimeout(1000000)

let token

const testPassword = '123456'

const testProduct = {
  title: 'Refrigerante',
  description: 'Coca Cola 600ml',
  department: 'Depósitos',
  brand: 'Coca cola',
  price: 5.50,
  qtd_stock: 866,
  bar_codes: '1234567891011'
}

let productId

beforeAll(async () => {
  const login = await server.post('/api/v1/user').send({
    email: 'carlos.test@gmail.com',
    password: testPassword
  })

  const authenticate = await server.post('/api/v1/authenticate').send({
    email: login.body.email,
    password: testPassword
  })

  token = authenticate.body.token
})

describe('Products Service', () => {
  describe('POST /product', () => {
    it('should create a product', async () => {
      const response = await server.post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProduct)

      productId = response.body._id
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('_id')
    })
    it('should return 400 Bad Request - bar codes already exists', async () => {
      const response = await server.post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send(testProduct)

      expect(response.body).toHaveProperty('details')
      expect(response.status).toBe(400)
    })
    it('should return 400 Bad Request - missing required property', async () => {
      const response = await server.post('/api/v1/product')
        .set('Authorization', `Bearer ${token}`).send({
          title: 'Refrigerante',
          description: 'Coca Cola 600ml',
          department: 'Depósitos',
          price: 5.50,
          qtd_stock: 866,
          bar_codes: '1234567891011'
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })
  })

  describe('GET /product', () => {
    it('should return 200 OK', async () => {
      const res = await server.get('/api/v1/product')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const res = await server.get('/api/v1/product')
      expect(res.status).toEqual(401)
    })
  })

  describe('GET /product/:id', () => {
    it('should return 200 OK', async () => {
      const res = await server.get(`/api/v1/product/${productId}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
    })

    it('should return 200 - adding limit and offset query', async () => {
      const res = await server.get('/api/v1/product?limit=1&offset=1')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const res = await server.get(`/api/v1/product/${productId}`)
      expect(res.status).toEqual(401)
    })

    it('should return 400 Bad Request - passing an invalid ID', async () => {
      const res = await server.get('/api/v1/product/123')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(400)
    })

    it('should return 404 Not Found - passing a valid but inexistent ID', async () => {
      const res = await server.get('/api/v1/product/5e9f1b9b9b9b9b9b9b9b9b9b')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(404)
    })
  })

  describe('GET /product/low_stock', () => {
    it('should return 200 OK', async () => {
      const res = await server.get('/api/v1/product/low_stock')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
    })

    it('should return 401 Unauthorized - not passing bearer token', async () => {
      const res = await server.get('/api/v1/product/low_stock')
      expect(res.status).toEqual(401)
    })

    it('should return 200 - adding limit and offset query', async () => {
      const res = await server.get('/api/v1/product/low_stock?limit=1&offset=1')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
    })
  })
})
