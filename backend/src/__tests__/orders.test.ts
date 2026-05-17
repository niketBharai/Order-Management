import request from 'supertest'
import express from 'express'
import cors from 'cors'
import orderRoutes from '../routes/orders'
import { ordersStore } from '../data/orders'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/orders', orderRoutes)

describe('Orders API', () => {
  beforeEach(() => {
    ordersStore.clear()
  })

  describe('POST /api/orders', () => {
    it('should create a new order with valid data', async () => {
      const orderData = {
        items: [
          {
            id: '1',
            name: 'Margherita Pizza',
            description: 'Classic pizza',
            price: 12.99,
            image: 'https://example.com/pizza.jpg',
            quantity: 2,
          },
        ],
        deliveryDetails: {
          name: 'John Doe',
          address: '123 Main St',
          phone: '555-1234',
        },
      }

      const response = await request(app)
        .post('/api/orders')
        .send(orderData)

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
      expect(response.body).toHaveProperty('status', 'Order Received')
      expect(response.body).toHaveProperty('total')
      expect(response.body.total).toBe(25.98)
      expect(response.body.items).toHaveLength(1)
      expect(response.body.deliveryDetails).toEqual(orderData.deliveryDetails)
    })

    it('should reject order without items', async () => {
      const orderData = {
        items: [],
        deliveryDetails: {
          name: 'John Doe',
          address: '123 Main St',
          phone: '555-1234',
        },
      }

      const response = await request(app)
        .post('/api/orders')
        .send(orderData)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })

    it('should reject order without delivery details', async () => {
      const orderData = {
        items: [
          {
            id: '1',
            name: 'Margherita Pizza',
            description: 'Classic pizza',
            price: 12.99,
            image: 'https://example.com/pizza.jpg',
            quantity: 2,
          },
        ],
      }

      const response = await request(app)
        .post('/api/orders')
        .send(orderData)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })

    it('should reject order with invalid price', async () => {
      const orderData = {
        items: [
          {
            id: '1',
            name: 'Margherita Pizza',
            description: 'Classic pizza',
            price: -10,
            image: 'https://example.com/pizza.jpg',
            quantity: 2,
          },
        ],
        deliveryDetails: {
          name: 'John Doe',
          address: '123 Main St',
          phone: '555-1234',
        },
      }

      const response = await request(app)
        .post('/api/orders')
        .send(orderData)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })

    it('should reject order with invalid quantity', async () => {
      const orderData = {
        items: [
          {
            id: '1',
            name: 'Margherita Pizza',
            description: 'Classic pizza',
            price: 12.99,
            image: 'https://example.com/pizza.jpg',
            quantity: 0,
          },
        ],
        deliveryDetails: {
          name: 'John Doe',
          address: '123 Main St',
          phone: '555-1234',
        },
      }

      const response = await request(app)
        .post('/api/orders')
        .send(orderData)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })

    it('should reject order with missing name', async () => {
      const orderData = {
        items: [
          {
            id: '1',
            name: 'Margherita Pizza',
            description: 'Classic pizza',
            price: 12.99,
            image: 'https://example.com/pizza.jpg',
            quantity: 2,
          },
        ],
        deliveryDetails: {
          name: '',
          address: '123 Main St',
          phone: '555-1234',
        },
      }

      const response = await request(app)
        .post('/api/orders')
        .send(orderData)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })
  })

  describe('GET /api/orders', () => {
    it('should return all orders', async () => {
      const orderData = {
        items: [
          {
            id: '1',
            name: 'Margherita Pizza',
            description: 'Classic pizza',
            price: 12.99,
            image: 'https://example.com/pizza.jpg',
            quantity: 2,
          },
        ],
        deliveryDetails: {
          name: 'John Doe',
          address: '123 Main St',
          phone: '555-1234',
        },
      }

      await request(app).post('/api/orders').send(orderData)
      await request(app).post('/api/orders').send(orderData)

      const response = await request(app).get('/api/orders')

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBe(2)
    })

    it('should return empty array when no orders exist', async () => {
      const response = await request(app).get('/api/orders')

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBe(0)
    })
  })

  describe('GET /api/orders/:id', () => {
    it('should return order by ID', async () => {
      const orderData = {
        items: [
          {
            id: '1',
            name: 'Margherita Pizza',
            description: 'Classic pizza',
            price: 12.99,
            image: 'https://example.com/pizza.jpg',
            quantity: 2,
          },
        ],
        deliveryDetails: {
          name: 'John Doe',
          address: '123 Main St',
          phone: '555-1234',
        },
      }

      const createResponse = await request(app)
        .post('/api/orders')
        .send(orderData)

      const response = await request(app).get(`/api/orders/${createResponse.body.id}`)

      expect(response.status).toBe(200)
      expect(response.body.id).toBe(createResponse.body.id)
    })

    it('should return 404 for non-existent order', async () => {
      const response = await request(app).get('/api/orders/non-existent-id')

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error')
    })
  })

  describe('PATCH /api/orders/:id/status', () => {
    it('should update order status', async () => {
      const orderData = {
        items: [
          {
            id: '1',
            name: 'Margherita Pizza',
            description: 'Classic pizza',
            price: 12.99,
            image: 'https://example.com/pizza.jpg',
            quantity: 2,
          },
        ],
        deliveryDetails: {
          name: 'John Doe',
          address: '123 Main St',
          phone: '555-1234',
        },
      }

      const createResponse = await request(app)
        .post('/api/orders')
        .send(orderData)

      const response = await request(app)
        .patch(`/api/orders/${createResponse.body.id}/status`)
        .send({ status: 'Preparing' })

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('Preparing')
    })

    it('should reject invalid status', async () => {
      const orderData = {
        items: [
          {
            id: '1',
            name: 'Margherita Pizza',
            description: 'Classic pizza',
            price: 12.99,
            image: 'https://example.com/pizza.jpg',
            quantity: 2,
          },
        ],
        deliveryDetails: {
          name: 'John Doe',
          address: '123 Main St',
          phone: '555-1234',
        },
      }

      const createResponse = await request(app)
        .post('/api/orders')
        .send(orderData)

      const response = await request(app)
        .patch(`/api/orders/${createResponse.body.id}/status`)
        .send({ status: 'Invalid Status' })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })

    it('should return 404 for non-existent order', async () => {
      const response = await request(app)
        .patch('/api/orders/non-existent-id/status')
        .send({ status: 'Preparing' })

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error')
    })
  })
})
