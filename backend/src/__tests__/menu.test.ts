import request from 'supertest'
import express from 'express'
import menuRoutes from '../routes/menu'

const app = express()
app.use(express.json())
app.use('/api/menu', menuRoutes)

describe('Menu API', () => {
  it('should return all menu items', async () => {
    const response = await request(app).get('/api/menu')
    
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('name')
    expect(response.body[0]).toHaveProperty('description')
    expect(response.body[0]).toHaveProperty('price')
    expect(response.body[0]).toHaveProperty('image')
  })

  it('should return menu items with correct structure', async () => {
    const response = await request(app).get('/api/menu')
    
    response.body.forEach((item: any) => {
      expect(typeof item.id).toBe('string')
      expect(typeof item.name).toBe('string')
      expect(typeof item.description).toBe('string')
      expect(typeof item.price).toBe('number')
      expect(item.price).toBeGreaterThan(0)
      expect(typeof item.image).toBe('string')
    })
  })
})
