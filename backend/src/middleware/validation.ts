import { Request, Response, NextFunction } from 'express'
import { CartItem, DeliveryDetails } from '../types'

export const validateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { items, deliveryDetails } = req.body

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item' })
  }

  for (const item of items) {
    if (!item.id || !item.name || !item.price || !item.quantity) {
      return res.status(400).json({ error: 'Invalid item format' })
    }
    if (typeof item.price !== 'number' || item.price <= 0) {
      return res.status(400).json({ error: 'Invalid price' })
    }
    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      return res.status(400).json({ error: 'Invalid quantity' })
    }
  }

  if (!deliveryDetails) {
    return res.status(400).json({ error: 'Delivery details are required' })
  }

  const { name, address, phone } = deliveryDetails

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required' })
  }

  if (!address || typeof address !== 'string' || address.trim().length === 0) {
    return res.status(400).json({ error: 'Address is required' })
  }

  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    return res.status(400).json({ error: 'Phone number is required' })
  }

  next()
}
