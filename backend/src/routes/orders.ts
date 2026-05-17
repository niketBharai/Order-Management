import { Router } from 'express'
import { ordersStore } from '../data/orders'
import { validateOrder } from '../middleware/validation'

const router = Router()

// Get all orders
router.get('/', (req, res) => {
  res.json(ordersStore.getAll())
})

// Get order by ID
router.get('/:id', (req, res) => {
  const order = ordersStore.getById(req.params.id)
  if (!order) {
    return res.status(404).json({ error: 'Order not found' })
  }
  res.json(order)
})

// Create new order
router.post('/', validateOrder, (req, res) => {
  const { items, deliveryDetails } = req.body
  
  const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
  
  const newOrder = ordersStore.create({
    items,
    deliveryDetails,
    total,
    status: 'Order Received',
  })
  
  // Simulate order status updates
  simulateOrderProgress(newOrder.id)
  
  res.status(201).json(newOrder)
})

// Update order status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body
  const validStatuses = ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered']
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  
  const updatedOrder = ordersStore.updateStatus(req.params.id, status)
  if (!updatedOrder) {
    return res.status(404).json({ error: 'Order not found' })
  }
  
  res.json(updatedOrder)
})

// Simulate order progress
function simulateOrderProgress(orderId: string) {
  const statuses: Array<'Order Received' | 'Preparing' | 'Out for Delivery' | 'Delivered'> = [
    'Order Received',
    'Preparing',
    'Out for Delivery',
    'Delivered',
  ]
  
  let currentIndex = 0
  
  const interval = setInterval(() => {
    currentIndex++
    if (currentIndex >= statuses.length) {
      clearInterval(interval)
      return
    }
    
    ordersStore.updateStatus(orderId, statuses[currentIndex])
  }, 10000) // Update status every 10 seconds
}

export default router
