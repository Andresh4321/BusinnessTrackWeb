import { render, screen } from '@testing-library/react'
import BillOfMaterials from '@/app/BillOfMaterials/page'
import { mockAppContextValue } from '../utils/test-utils'

// Mock dependencies
jest.mock('@/app/dashboard/DashboardLayout', () => ({
  DashboardLayout: ({ children, title, subtitle }: { 
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

jest.mock('@/app/context/AppContext', () => ({
  useApp: () => mockAppContextValue,
}))

describe('Bill of Materials Page', () => {
  test('renders bill of materials page without crashing', () => {
    render(<BillOfMaterials />)
    expect(screen.getByText('Bill of Materials')).toBeInTheDocument()
  })

  test('displays correct subtitle', () => {
    render(<BillOfMaterials />)
    expect(screen.getByText('Complete inventory valuation')).toBeInTheDocument()
  })

  test('displays total items summary card', () => {
    render(<BillOfMaterials />)
    expect(screen.getByText('Total Items')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('displays materials table or list', () => {
    render(<BillOfMaterials />)
    expect(screen.getByText('Test Material')).toBeInTheDocument()
  })

  test('calculates and displays total inventory value', () => {
    render(<BillOfMaterials />)
    expect(screen.getByText('Total Value')).toBeInTheDocument()
  })
})
