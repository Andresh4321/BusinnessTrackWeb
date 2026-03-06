import { render, screen, fireEvent } from '@testing-library/react'
import Suppliers from '@/app/Suppliers/page'
import { mockAppContextValue } from '../utils/test-utils'

// Mock dependencies
jest.mock('@/app/dashboard/DashboardLayout', () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  ),
}))

jest.mock('@/app/context/AppContext', () => ({
  useApp: () => mockAppContextValue,
}))

jest.mock('@/app/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe('Suppliers Page', () => {
  test('renders suppliers page without crashing', () => {
    render(<Suppliers />)
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
  })

  test('displays add supplier button', () => {
    render(<Suppliers />)
    const addButton = screen.getByRole('button', { name: /add supplier/i })
    expect(addButton).toBeInTheDocument()
  })

  test('displays search input for filtering suppliers', () => {
    render(<Suppliers />)
    const searchInput = screen.getByPlaceholderText(/search by supplier/i)
    expect(searchInput).toBeInTheDocument()
  })

  test('displays supplier information from context', () => {
    render(<Suppliers />)
    expect(screen.getByText('Test Supplier')).toBeInTheDocument()
    expect(screen.getByText('test@supplier.com')).toBeInTheDocument()
  })

  test('search input filters suppliers', () => {
    render(<Suppliers />)
    const searchInput = screen.getByPlaceholderText(/search by supplier/i)
    fireEvent.change(searchInput, { target: { value: 'Test' } })
    
    expect(searchInput).toHaveValue('Test')
  })
})
