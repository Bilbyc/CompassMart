/* eslint-disable no-undef */
import App from '../../../app'
import request from 'supertest'

const server = request(App)

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
  describe('/POST Create User', () => {
    it('should return 201 - and create a new user', async () => {
      const response = await server.post('/api/v1/user').send(testUser)

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('_id')
    })

    it('should return 400 Bad Request - Email already in use', async () => {
      const user = await server.post('/api/v1/user')
        .send({ email: 'Ficctional@gmail.com', password: '123456' })

      const response = await server.post('/api/v1/user').send({
        email: user.body.email,
        password: '123456'
      })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('details')
    })

    it('should return 400 Bad Request - Missing required property', async () => {
      const response = await server.post('/api/v1/user').send(missingFieldUser)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('details')
    })

    it('should return 400 - email cant be empty, password must be string', async () => {
      const response = await server.post('/api/v1/user').send(badlyFormattedUser)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('details')
    })
  })

  describe('/POST Authenticate User', () => {
    it('should return 200 - and return a token on body', async () => {
      const response = await server.post('/api/v1/authenticate').send(testUser)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('token')
    })

    it('should return 404 - Email not found', async () => {
      const response = await server.post('/api/v1/authenticate').send({
        email: 'NotRegistered@gmail.com',
        password: '123456'
      })

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('details')
    })

    it('should return 400 - Password does not match', async () => {
      const response = await server.post('/api/v1/authenticate').send({
        email: testUser.email,
        password: '12345'
      })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('details')
    })
  })
})
