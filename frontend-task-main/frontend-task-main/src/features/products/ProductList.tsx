import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function ProductList() {
  useEffect(() => {
  console.log('[React] Component mounted')
}, [])
  return (
   <section aria-labelledby="products-heading">
  <h1 id="products-heading">Products</h1>

  {/* Info banner (remove for candidates if you want) */}
  <p role="note" style={{fontSize:14, color:'#555', marginTop:8}}>
    Starter loaded. Build your toolbar (search, filter, sort), fetch data from <code>/products</code>, 
    render a list/grid, and add pagination. Check the README for details.
  </p>

  {/* Placeholder states */}
  <p data-testid="placeholder-empty" style={{marginTop:24}}>
    No products yet — implement fetching to populate this list.
  </p>

  {/* Placeholder list container candidates will replace */}
  <div aria-live="polite" data-testid="products-list" style={{marginTop:8}}>
    <em style={{color:'#777'}}>Render product cards/items here…</em>
  </div>

  {/* Placeholder pagination */}
  <nav aria-label="Pagination" style={{marginTop:24}}>
    <em style={{color:'#777'}}>Pagination controls go here…</em>
  </nav>
</section>

  )
}
