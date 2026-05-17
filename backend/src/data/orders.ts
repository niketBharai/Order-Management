import { Order } from '../types'

let orders: Order[] = []

export const ordersStore = {
  getAll: (): Order[] => orders,
  
  getById: (id: string): Order | undefined => {
    return orders.find((order) => order.id === id)
  },
  
  create: (order: Omit<Order, 'id' | 'createdAt'>): Order => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }
    orders.push(newOrder)
    return newOrder
  },
  
  updateStatus: (id: string, status: Order['status']): Order | null => {
    const orderIndex = orders.findIndex((order) => order.id === id)
    if (orderIndex === -1) return null
    
    orders[orderIndex].status = status
    return orders[orderIndex]
  },
  
  clear: (): void => {
    orders = []
  },
}
