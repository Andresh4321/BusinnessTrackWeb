import { render, screen, waitFor } from '@testing-library/react'
import Production from '@/app/Production/page'
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

describe('Production Page', () => {
  test('renders production page without crashing', () => {
    render(<Production />)
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
  })

  test('displays recipe management content', async () => {
    render(<Production />)
    await waitFor(() => {
      const recipeElements = screen.queryAllByText(/recipe/i)
      expect(recipeElements.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })

  test('displays recipe information from context', async () => {
    const { container } = render(<Production />)
    await waitFor(() => {
      expect(container.textContent).toContain('Recipe')
    }, { timeout: 3000 })
  })

  test('displays production batches section', async () => {
    render(<Production />)
    await waitFor(() => {
      const batchElements = screen.queryAllByText(/batch/i)
      expect(batchElements.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })

  test('shows loading state initially', () => {
    const { container } = render(<Production />)
    expect(container.querySelector('[class*="animate"]')).toBeInTheDocument()
  })
})
