'use client'

import { useState } from 'react'
import { CartItem, DeliveryDetails } from '@/types'

export default function Checkout({
  cart,
  onPlaceOrder,
  onCancel,
}: {
  cart: CartItem[]
  onPlaceOrder: (details: DeliveryDetails) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<DeliveryDetails>({
    name: '',
    address: '',
    phone: '',
  })

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.address || !formData.phone) {
      alert('Please fill in all fields')
      return
    }
    onPlaceOrder(formData)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onCancel}
        className="mb-4 text-gray-600 hover:text-gray-800 transition"
      >
        ← Back to Menu
      </button>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-1">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold pt-2 border-t mt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">Delivery Address</label>
            <textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  )
}
