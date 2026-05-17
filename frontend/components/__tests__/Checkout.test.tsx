import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Checkout from '../Checkout'
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
]

describe('Checkout Component', () => {
  it('should render checkout form', () => {
    const onPlaceOrder = jest.fn()
    const onCancel = jest.fn()
    
    render(
      <Checkout
        cart={mockCart}
        onPlaceOrder={onPlaceOrder}
        onCancel={onCancel}
      />
    )
    
    expect(screen.getByText('Checkout')).toBeInTheDocument()
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Delivery Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument()
  })

  it('should display order summary', () => {
    const onPlaceOrder = jest.fn()
    const onCancel = jest.fn()
    
    render(
      <Checkout
        cart={mockCart}
        onPlaceOrder={onPlaceOrder}
        onCancel={onCancel}
      />
    )
    
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
    expect(screen.getByText('Margherita Pizza x 2')).toBeInTheDocument()
    expect(screen.getAllByText('$25.98')).toHaveLength(2)
  })

  it('should call onCancel when back button is clicked', () => {
    const onPlaceOrder = jest.fn()
    const onCancel = jest.fn()
    
    render(
      <Checkout
        cart={mockCart}
        onPlaceOrder={onPlaceOrder}
        onCancel={onCancel}
      />
    )
    
    const backButton = screen.getByText('← Back to Menu')
    fireEvent.click(backButton)
    
    expect(onCancel).toHaveBeenCalled()
  })

  it('should call onPlaceOrder with valid form data', async () => {
    const onPlaceOrder = jest.fn()
    const onCancel = jest.fn()
    
    render(
      <Checkout
        cart={mockCart}
        onPlaceOrder={onPlaceOrder}
        onCancel={onCancel}
      />
    )
    
    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByLabelText('Delivery Address'), {
      target: { value: '123 Main St' },
    })
    fireEvent.change(screen.getByLabelText('Phone Number'), {
      target: { value: '555-1234' },
    })
    
    const placeOrderButton = screen.getByText('Place Order')
    fireEvent.click(placeOrderButton)
    
    await waitFor(() => {
      expect(onPlaceOrder).toHaveBeenCalledWith({
        name: 'John Doe',
        address: '123 Main St',
        phone: '555-1234',
      })
    })
  })

  it('should not submit form with empty fields', () => {
    const onPlaceOrder = jest.fn()
    const onCancel = jest.fn()
    
    render(
      <Checkout
        cart={mockCart}
        onPlaceOrder={onPlaceOrder}
        onCancel={onCancel}
      />
    )
    
    const placeOrderButton = screen.getByText('Place Order')
    fireEvent.click(placeOrderButton)
    
    expect(onPlaceOrder).not.toHaveBeenCalled()
  })
})
