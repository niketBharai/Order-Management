import express from 'express'
import cors from 'cors'
import menuRoutes from './routes/menu'
import orderRoutes from './routes/orders'

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Food Delivery API is running' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
