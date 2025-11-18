import { useEffect, useState } from 'react'

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'

export type UseProductsParams = {
  query: string
  category: string
  sort: SortOption
  page: number
  limit?: number
  refreshKey?: number
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  image?: string
}

export type PaginationInfo = {
  page: number
  totalPages: number
  totalItems: number
  limit: number
}

type ProductsResponse = {
  items: Product[]
  page: number
  limit: number
  totalPages: number
  totalItems: number
  categories: string[]
}

const emptyPagination: PaginationInfo = {
  page: 1,
  totalPages: 1,
  totalItems: 0,
  limit: 10,
}

const DEFAULT_LIMIT = 10

const useProducts = ({
  query,
  category,
  sort,
  page,
  limit = DEFAULT_LIMIT,
  refreshKey = 0,
}: UseProductsParams) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo>(emptyPagination)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const controller = new AbortController()

    const fetchProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          query,
          category,
          sort,
          page: String(page),
          limit: String(limit),
        })

        const response = await fetch(`/products?${params.toString()}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Unable to load products')
        }

        const data = (await response.json()) as ProductsResponse

        setProducts(data.items)
        setPagination({
          page: data.page,
          totalPages: data.totalPages,
          totalItems: data.totalItems,
          limit: data.limit,
        })
        setCategories(data.categories ?? [])
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }

        setError(err instanceof Error ? err : new Error('Unknown error'))
        setProducts([])
        setCategories([])
        setPagination(emptyPagination)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

    return () => {
      controller.abort()
    }
  }, [query, category, sort, page, limit, refreshKey])

  return { products, loading, error, pagination, categories }
}

export default useProducts

