import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Materials from '@/app/Materials/page'
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

describe('Materials Page', () => {
  test('renders materials page without crashing', () => {
    render(<Materials />)
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
  })

  test('displays the add material button', () => {
    render(<Materials />)
    const addButtons = screen.getAllByText(/add material/i)
    expect(addButtons.length).toBeGreaterThan(0)
  })

  test('displays material list from context', () => {
    render(<Materials />)
    expect(screen.getByText('Test Material')).toBeInTheDocument()
  })

  test('displays material information', () => {
    const { container } = render(<Materials />)
    expect(container.textContent).toContain('kg')
  })

  test('shows material inventory cards', () => {
    const { container } = render(<Materials />)
    const cards = container.querySelectorAll('[class*="card"]')
    expect(cards.length).toBeGreaterThan(0)
  })
})
