import { render, screen } from '@testing-library/react'
import Dashboard from '@/app/dashboard/page'
import { mockAppContextValue } from '../utils/test-utils'

// Mock dependencies
jest.mock('@/app/dashboard/DashboardLayout', () => ({
  DashboardLayout: ({ 
    children, 
    title, 
    subtitle 
  }: { 
    children: React.ReactNode; 
    title: string; 
    subtitle: string 
  }) => (
    <div data-testid="dashboard-layout">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {children}
    </div>
  ),
}))

jest.mock('@/app/dashboard/_components/StatCard', () => ({
  StatCard: ({ title, value }: { title: string; value: number }) => (
    <div data-testid="stat-card">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  ),
}))

jest.mock('@/app/context/AppContext', () => ({
  useApp: () => mockAppContextValue,
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('Dashboard Page', () => {
  test('renders dashboard without crashing', () => {
    render(<Dashboard />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  test('displays correct welcome message', () => {
    render(<Dashboard />)
    expect(screen.getByText("Welcome back! Here's your production overview.")).toBeInTheDocument()
  })

  test('renders stat cards for materials, alerts, and value', () => {
    render(<Dashboard />)
    const statCards = screen.getAllByTestId('stat-card')
    expect(statCards.length).toBeGreaterThanOrEqual(3)
  })

  test('displays total materials stat card', () => {
    render(<Dashboard />)
    expect(screen.getByText('Total Materials')).toBeInTheDocument()
    const numbers = screen.getAllByText('1')
    expect(numbers.length).toBeGreaterThan(0)
  })

  test('calculates and displays inventory value', () => {
    render(<Dashboard />)
    const inventoryValue = screen.getByText('Inventory Value')
    expect(inventoryValue).toBeInTheDocument()
  })
})
