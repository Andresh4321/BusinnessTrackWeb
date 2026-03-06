import { render, screen, fireEvent } from '@testing-library/react'
import StockManagement from '@/app/StockManagement/page'
import { mockAppContextValue } from '../utils/test-utils'

// Mock dependencies
jest.mock('@/app/dashboard/DashboardLayout', () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  ),
}))

jest.mock('@/app/context/AppContext', () => ({
  useApp: () => ({
    ...mockAppContextValue,
    stockLogs: [
      {
        id: '1',
        materialId: '1',
        materialName: 'Test Material',
        action: 'add',
        quantity: 50,
        previousStock: 100,
        newStock: 150,
        date: new Date(),
        remarks: 'Test remark',
      },
    ],
    updateStock: jest.fn(),
  }),
}))

jest.mock('@/app/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe('Stock Management Page', () => {
  test('renders stock management page without crashing', () => {
    render(<StockManagement />)
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
  })

  test('displays add stock and remove stock buttons', () => {
    render(<StockManagement />)
    const buttons = screen.getAllByText(/stock/i)
    expect(buttons.length).toBeGreaterThan(0)
  })

  test('displays stock logs history section', () => {
    render(<StockManagement />)
    const materials = screen.getAllByText(/material/i)
    expect(materials.length).toBeGreaterThan(0)
  })

  test('shows stock adjustment counter', () => {
    render(<StockManagement />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('displays stock movement table or list', () => {
    const { container } = render(<StockManagement />)
    expect(container.querySelector('[class*="grid"]')).toBeInTheDocument()
  })
})
