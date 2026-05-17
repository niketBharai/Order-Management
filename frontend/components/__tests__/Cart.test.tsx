import { render, screen, fireEvent } from '@testing-library/react'
import Cart from '../Cart'
import { CartItem } from '@/types'

const mockCart: CartItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza',
    price: 12.99,
    image: 'https://example.com/pizza.jpg',
    quantity: 2,
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'Loaded with pepperoni',
    price: 14.99,
    image: 'https://example.com/pepperoni.jpg',
    quantity: 1,
  },
]

describe('Cart Component', () => {
  it('should display cart items', () => {
    const onRemove = jest.fn()
    const onUpdateQuantity = jest.fn()
    const onCheckout = jest.fn()
    
    render(
      <Cart
        cart={mockCart}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
        onCheckout={onCheckout}
      />
    )
    
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument()
    expect(screen.getByText('Pepperoni Pizza')).toBeInTheDocument()
  })

  it('should display correct total', () => {
    const onRemove = jest.fn()
    const onUpdateQuantity = jest.fn()
    const onCheckout = jest.fn()
    
    render(
      <Cart
        cart={mockCart}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
        onCheckout={onCheckout}
      />
    )
    
    expect(screen.getByText('$40.97')).toBeInTheDocument()
  })

  it('should call onRemove when remove button is clicked', () => {
    const onRemove = jest.fn()
    const onUpdateQuantity = jest.fn()
    const onCheckout = jest.fn()
    
    render(
      <Cart
        cart={mockCart}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
        onCheckout={onCheckout}
      />
    )
    
    const removeButtons = screen.getAllByText('Remove')
    fireEvent.click(removeButtons[0])
    
    expect(onRemove).toHaveBeenCalledWith('1')
  })

  it('should call onUpdateQuantity when quantity is changed', () => {
    const onRemove = jest.fn()
    const onUpdateQuantity = jest.fn()
    const onCheckout = jest.fn()
    
    render(
      <Cart
        cart={mockCart}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
        onCheckout={onCheckout}
      />
    )
    
    const plusButtons = screen.getAllByText('+')
    fireEvent.click(plusButtons[0])
    
    expect(onUpdateQuantity).toHaveBeenCalledWith('1', 3)
  })

  it('should call onCheckout when checkout button is clicked', () => {
    const onRemove = jest.fn()
    const onUpdateQuantity = jest.fn()
    const onCheckout = jest.fn()
    
    render(
      <Cart
        cart={mockCart}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
        onCheckout={onCheckout}
      />
    )
    
    const checkoutButton = screen.getByText('Proceed to Checkout')
    fireEvent.click(checkoutButton)
    
    expect(onCheckout).toHaveBeenCalled()
  })

  it('should display empty cart message when cart is empty', () => {
    const onRemove = jest.fn()
    const onUpdateQuantity = jest.fn()
    const onCheckout = jest.fn()
    
    render(
      <Cart
        cart={[]}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
        onCheckout={onCheckout}
      />
    )
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })
})
