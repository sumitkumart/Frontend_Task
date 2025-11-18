import { useMemo, useState } from 'react'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import Toolbar from '../components/Toolbar'
import useProducts, { type SortOption } from '../hooks/useProducts'

const LIMIT = 10

const ProductsPage = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState<SortOption>('name-asc')
  const [page, setPage] = useState(1)
  const [requestVersion, setRequestVersion] = useState(0)

  const { products, loading, error, pagination, categories } = useProducts({
    query,
    category,
    sort,
    page,
    limit: LIMIT,
    refreshKey: requestVersion,
  })

  const totalItemsLabel = useMemo(() => {
    if (loading) return 'Just a moment, loading products...'
    if (!pagination.totalItems) return "We couldn't find any products"
    const start = (pagination.page - 1) * pagination.limit + 1
    const end = Math.min(pagination.totalItems, pagination.page * pagination.limit)
    if (pagination.totalItems === 1) {
      return 'Found 1 product'
    }
    return `Found ${pagination.totalItems} products • Showing ${start}-${end}`
  }, [pagination, loading])

  const resetToFirstPage = () => setPage(1)

  const goToPage = (nextPage: number) => {
    const totalPages = Math.max(1, pagination.totalPages)
    const target = Math.min(Math.max(1, nextPage), totalPages)
    setPage(target)
  }

  const handleRetry = () => {
    setRequestVersion((prev) => prev + 1)
  }

  const hasResults = products.length > 0

  return (
    <section className="page products-page">
      <header>
        <p className="eyebrow">Welcome to Listings Manager</p>
        <h1>Browse Our Products</h1>
        <p>Find exactly what you're looking for. Search, filter by category, or browse through our collection.</p>
      </header>

      <Toolbar
        query={query}
        category={category}
        sort={sort}
        categories={categories}
        onSearch={(value) => {
          setQuery(value)
          resetToFirstPage()
        }}
        onFilter={(value) => {
          setCategory(value)
          resetToFirstPage()
        }}
        onSort={(value) => {
          setSort(value)
          resetToFirstPage()
        }}
      />

      <p role="status" aria-live="polite" className="results-summary">
        {totalItemsLabel}
      </p>

      {loading && <Loader />}

      {error && !loading && (
        <div className="state state--error" role="alert">
          <p>Oops! Something went wrong while loading products.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
            {error.message}
          </p>
          <button type="button" onClick={handleRetry}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && !hasResults && (
        <div className="state state--empty" role="status" aria-live="polite">
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            We couldn't find any products matching your search.
          </p>
          <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '1rem' }}>
            Try adjusting your filters or search terms to see more results.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setCategory('all')
              setSort('name-asc')
              resetToFirstPage()
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}

      {hasResults && (
        <div className="product-grid" role="list" aria-live="polite">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {hasResults && pagination.totalPages > 1 && (
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={goToPage} />
      )}
    </section>
  )
}

export default ProductsPage

