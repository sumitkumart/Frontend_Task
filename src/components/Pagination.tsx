type PaginationProps = {
  page: number
  totalPages: number
  onChange: (nextPage: number) => void
}

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  const canGoBack = page > 1
  const canGoForward = page < totalPages

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        onClick={() => canGoBack && onChange(page - 1)}
        disabled={!canGoBack}
        aria-label="Go to previous page"
      >
        Previous
      </button>
      <span aria-live="polite" style={{ fontWeight: 500 }}>
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => canGoForward && onChange(page + 1)}
        disabled={!canGoForward}
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination

