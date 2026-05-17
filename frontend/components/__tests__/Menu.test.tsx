import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Menu from '../Menu'
import { MenuItem } from '@/types'

// Mock fetch
global.fetch = jest.fn()

const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh tomatoes',
    price: 12.99,
    image: 'https://example.com/pizza.jpg',
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'Loaded with pepperoni',
    price: 14.99,
    image: 'https://example.com/pepperoni.jpg',
  },
]

describe('Menu Component', () => {
  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  it('should display loading state initially', () => {
    ;(global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}))
    
    render(<Menu onAddToCart={jest.fn()} />)
    
    expect(screen.getByText('Loading menu...')).toBeInTheDocument()
  })

  it('should display menu items after loading', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockMenuItems),
    })
    
    render(<Menu onAddToCart={jest.fn()} />)
    
    await waitFor(() => {
      expect(screen.getByText('Margherita Pizza')).toBeInTheDocument()
      expect(screen.getByText('Pepperoni Pizza')).toBeInTheDocument()
    })
  })

  it('should call onAddToCart when add to cart button is clicked', async () => {
    const onAddToCart = jest.fn()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockMenuItems),
    })
    
    render(<Menu onAddToCart={onAddToCart} />)
    
    await waitFor(() => {
      expect(screen.getByText('Margherita Pizza')).toBeInTheDocument()
    })
    
    const addButton = screen.getAllByText('Add to Cart')[0]
    fireEvent.click(addButton)
    
    expect(onAddToCart).toHaveBeenCalledWith(mockMenuItems[0], 1)
  })

  it('should display item prices correctly', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockMenuItems),
    })
    
    render(<Menu onAddToCart={jest.fn()} />)
    
    await waitFor(() => {
      expect(screen.getByText('$12.99')).toBeInTheDocument()
      expect(screen.getByText('$14.99')).toBeInTheDocument()
    })
  })
})
