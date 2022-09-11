/* eslint-disable no-undef */
import App from '../../../app'
import request from 'supertest'

const server = request(App)

jest.setTimeout(1000000)

const testUser = {
  email: 'Teste@gmail.com',
  password: '123456'
}

const missingFieldUser = {
  email: 'Missing@gmail.com'
}

const badlyFormattedUser = {
  email: '',
  password: 12345
}

describe('User Requests', () => {
  describe('Create User', () => {
    it('should return 201 - and create a new user', async () => {
      const response = await server.post('/api/v1/user').send(testUser)

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('_id')
    })

    it('should return 400 Bad Request - Email already in use', async () => {
      const response = await server.post('/api/v1/user').send(testUser)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('details')
    })

    it('should return 400 Bad Request - Missing required property', async () => {
      const response = await server.post('/api/v1/user').send(missingFieldUser)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })

    it('should return 400 - email cant be empty, password must be string', async () => {
      const response = await server.post('/api/v1/user').send(badlyFormattedUser)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })
  })
})
