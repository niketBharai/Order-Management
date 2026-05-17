export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface DeliveryDetails {
  name: string
  address: string
  phone: string
}

export interface Order {
  id: string
  items: CartItem[]
  deliveryDetails: DeliveryDetails
  total: number
  status: 'Order Received' | 'Preparing' | 'Out for Delivery' | 'Delivered'
  createdAt: string
}
