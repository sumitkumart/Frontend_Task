import type { SortOption } from '../hooks/useProducts'

const SORT_LABELS: Record<SortOption, string> = {
  'name-asc': 'Name (A to Z)',
  'name-desc': 'Name (Z to A)',
  'price-asc': 'Price (Low to High)',
  'price-desc': 'Price (High to Low)',
}

type ToolbarProps = {
  query: string
  category: string
  sort: SortOption
  categories: string[]
  onSearch: (value: string) => void
  onFilter: (value: string) => void
  onSort: (value: SortOption) => void
}

const Toolbar = ({
  query,
  category,
  sort,
  categories,
  onSearch,
  onFilter,
  onSort,
}: ToolbarProps) => {
  const searchId = 'toolbar-search'
  const categoryId = 'toolbar-category'
  const sortId = 'toolbar-sort'

  return (
    <form
      className="toolbar"
      aria-label="Product filters"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="toolbar__field" htmlFor={searchId}>
        <span>Search Products</span>
        <input
          id={searchId}
          type="search"
          name="query"
          value={query}
          onChange={(event) => onSearch(event.currentTarget.value)}
          placeholder="Type to search..."
        />
      </label>

      <label className="toolbar__field" htmlFor={categoryId}>
        <span>Filter by Category</span>
        <select
          id={categoryId}
          name="category"
          value={category}
          onChange={(event) => onFilter(event.currentTarget.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <label className="toolbar__field" htmlFor={sortId}>
        <span>Sort By</span>
        <select
          id={sortId}
          name="sort"
          value={sort}
          onChange={(event) => onSort(event.currentTarget.value as SortOption)}
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </form>
  )
}

export default Toolbar

