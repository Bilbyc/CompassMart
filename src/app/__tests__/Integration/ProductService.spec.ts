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
