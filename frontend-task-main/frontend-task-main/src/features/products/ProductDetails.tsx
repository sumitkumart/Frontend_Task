import { useParams, Link } from 'react-router-dom'

export function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  return (
    <article aria-labelledby="product-heading">
  <h1 id="product-heading">Product Details</h1>
  <p role="note" style={{fontSize:14, color:'#555'}}>
    Implement fetching from <code>/products/:id</code> and show loading/error/content states.
  </p>
  <p style={{color:'#777'}}>Details content goes here…</p>
  <p><Link to="/">Back</Link></p>
</article>

  )
}
