'use client'

import { useEffect, useState } from 'react'
import { Order } from '@/types'

export default function OrderStatus({
  order,
  onNewOrder,
}: {
  order: Order
  onNewOrder: () => void
}) {
  const [currentStatus, setCurrentStatus] = useState(order.status)

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`http://localhost:5001/api/orders/${order.id}`)
        .then((res) => res.json())
        .then((data) => setCurrentStatus(data.status))
        .catch((error) => console.error('Error fetching order status:', error))
    }, 3000)

    return () => clearInterval(interval)
  }, [order.id])

  const statuses = ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered']
  const currentIndex = statuses.indexOf(currentStatus)

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Order Status</h2>
          <button
            onClick={onNewOrder}
            className="text-primary hover:text-orange-600 transition"
          >
            Place New Order
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">Order ID: {order.id}</p>
          <p className="text-gray-600">
            Total: ${order.total.toFixed(2)}
          </p>
        </div>

        <div className="space-y-4">
          {statuses.map((status, index) => (
            <div
              key={status}
              className={`flex items-center gap-4 p-4 rounded-lg ${
                index <= currentIndex
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentIndex
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {index < currentIndex ? '✓' : index + 1}
              </div>
              <span
                className={`font-semibold ${
                  index <= currentIndex ? 'text-green-700' : 'text-gray-500'
                }`}
              >
                {status}
              </span>
            </div>
          ))}
        </div>

        {currentStatus === 'Delivered' && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
            <p className="text-green-800 font-semibold text-lg">
              🎉 Your order has been delivered! Enjoy your meal!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
