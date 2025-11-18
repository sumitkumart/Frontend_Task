import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProductsPage from './pages/ProductsPage'

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>
  )
}

export default App
