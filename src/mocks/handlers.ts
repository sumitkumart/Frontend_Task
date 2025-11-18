import { HttpResponse, http } from 'msw'
import products from './data/products.json'

// Extract unique categories only from products that exist in the data
const categories = Array.from(new Set(products.map((product) => product.category)))
  .sort((a, b) => a.localeCompare(b))

const sorters = {
  'name-asc': (a: typeof products[number], b: typeof products[number]) =>
    a.name.localeCompare(b.name),
  'name-desc': (a: typeof products[number], b: typeof products[number]) =>
    b.name.localeCompare(a.name),
  'price-asc': (a: typeof products[number], b: typeof products[number]) => a.price - b.price,
  'price-desc': (a: typeof products[number], b: typeof products[number]) => b.price - a.price,
}

export const handlers = [
  http.get('/products', ({ request }) => {
    const url = new URL(request.url)
    const query = (url.searchParams.get('query') ?? '').toLowerCase()
    const category = url.searchParams.get('category') ?? 'all'
    const sort = (url.searchParams.get('sort') ?? 'name-asc') as keyof typeof sorters
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'))
    const limit = Math.max(1, Number(url.searchParams.get('limit') ?? '10'))

    let filtered = products.slice()

    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query),
      )
    }

    if (category && category !== 'all') {
      filtered = filtered.filter((product) => product.category === category)
    }

    const sorter = sorters[sort] ?? sorters['name-asc']
    filtered.sort(sorter)

    const totalItems = filtered.length
    const totalPages = Math.max(1, Math.ceil(totalItems / limit))
    const currentPage = Math.min(page, totalPages)
    const start = (currentPage - 1) * limit
    const items = filtered.slice(start, start + limit)

    return HttpResponse.json({
      items,
      page: currentPage,
      limit,
      totalPages,
      totalItems,
      categories,
    })
  }),
  http.get('/products/:id', ({ params }) => {
    const product = products.find((item) => item.id === params.id)

    if (!product) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }

    return HttpResponse.json(product)
  }),
]

