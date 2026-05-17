'use client'

import { useEffect, useState } from 'react'
import { MenuItem } from '@/types'

export default function Menu({ onAddToCart }: { onAddToCart: (item: MenuItem, quantity: number) => void }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5001/api/menu')
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching menu:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading menu...</div>
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Our Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                  ${item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => onAddToCart(item, 1)}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
