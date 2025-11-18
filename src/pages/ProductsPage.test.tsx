import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ProductsPage from './ProductsPage'

const renderPage = () =>
  render(
    <MemoryRouter>
      <ProductsPage />
    </MemoryRouter>,
  )

describe('ProductsPage', () => {
  it('loads and renders products', async () => {
    renderPage()

    expect(await screen.findByText(/Aurora Desk Lamp/i)).toBeVisible()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(1)
  })

  it('filters products via search', async () => {
    const user = userEvent.setup()
    renderPage()

    const searchInput = await screen.findByLabelText(/search/i)
    await user.clear(searchInput)
    await user.type(searchInput, 'Aurora')

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(1)
    })
    expect(screen.getByText(/Aurora Desk Lamp/i)).toBeVisible()
  })
})


