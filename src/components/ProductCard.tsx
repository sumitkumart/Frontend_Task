import { Link } from 'react-router-dom'

type ProductSummary = {
  id: string
  name: string
  price: number
  category: string
  stock: number
}

type ProductCardProps = {
  product: ProductSummary
}

const ProductCard = ({ product }: ProductCardProps) => {
  const inStock = product.stock > 0
  const statusLabel = inStock ? `In Stock • ${product.stock} left` : 'Out of Stock'

  return (
    <article
      className="product-card"
      aria-labelledby={`product-${product.id}`}
      role="listitem"
    >
      <header>
        <p className="product-card__category">{product.category}</p>
        <h2 id={`product-${product.id}`}>{product.name}</h2>
      </header>
      <dl>
        <div>
          <dt>Price</dt>
          <dd>₹{product.price.toLocaleString('en-IN')}</dd>
        </div>
        <div>
          <dt>Stock</dt>
          <dd
            aria-label={`Stock status: ${statusLabel}`}
            className={`stock-display ${inStock ? 'stock-display--in' : 'stock-display--out'}`}
          >
            <span aria-hidden className="stock-pulse" />
            {statusLabel}
          </dd>
        </div>
      </dl>
      <div className="product-card__actions">
        <Link to={`/products/${product.id}`} aria-label={`View details for ${product.name}`}>
          View Details →
        </Link>
      </div>
    </article>
  )
}

export type { ProductSummary }
export default ProductCard

