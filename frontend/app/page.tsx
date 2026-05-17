'use client'

import { useState } from 'react'
import Menu from '@/components/Menu'
import Cart from '@/components/Cart'
import Checkout from '@/components/Checkout'
import OrderStatus from '@/components/OrderStatus'
import { CartItem, Order, DeliveryDetails, MenuItem } from '@/types'

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)

  const addToCart = (item: MenuItem, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity }]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  const handlePlaceOrder = async (deliveryDetails: DeliveryDetails): Promise<void> => {
    try {
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          deliveryDetails,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to place order')
      }

      const order = await response.json()
      setCurrentOrder(order)
      setCart([])
      setShowCheckout(false)
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }
    setShowCheckout(true)
  }

  if (currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <OrderStatus order={currentOrder} onNewOrder={() => setCurrentOrder(null)} />
      </div>
    )
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">🍕 Food Delivery</h1>
          <button
            onClick={handleCheckout}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            <span>Cart {totalItems > 0 && `(${totalItems})`}</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showCheckout ? (
          <Checkout
            cart={cart}
            onPlaceOrder={handlePlaceOrder}
            onCancel={() => setShowCheckout(false)}
          />
        ) : (
          <>
            <Menu onAddToCart={addToCart} />
            {cart.length > 0 && (
              <div className="mt-8">
                <Cart
                  cart={cart}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                  onCheckout={handleCheckout}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
