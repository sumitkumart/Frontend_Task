import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import type { Product } from '../hooks/useProducts'

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) {
      setError(new Error('Missing product id'))
      setLoading(false)
      return
    }

    const controller = new AbortController()

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/products/${id}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Product not found')
        }

        const data = (await response.json()) as Product
        setProduct(data)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(err instanceof Error ? err : new Error('Unknown error'))
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()

    return () => controller.abort()
  }, [id])

  const statusLabel =
    product && product.stock > 0
      ? `In Stock • ${product.stock} available`
      : 'Currently Out of Stock'

  return (
    <section className="page product-details-page">
      <button className="ghost-button" type="button" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>

      {loading && <Loader />}

      {error && !loading && (
        <div className="state state--error" role="alert">
          <p>Sorry, we couldn't find this product.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
            {error.message}
          </p>
          <Link to="/">← Back to All Products</Link>
        </div>
      )}

      {!loading && product && (
        <>
          <header>
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
          </header>

          <section className="product-details">
            <div>
              <h2>Description</h2>
              <p>{product.description}</p>
            </div>
            <dl>
              <div>
                <dt>Category</dt>
                <dd>{product.category}</dd>
              </div>
              <div>
                <dt>Stock</dt>
                <dd>{statusLabel}</dd>
              </div>
            </dl>
          </section>
        </>
      )}
    </section>
  )
}

export default ProductDetailsPage

