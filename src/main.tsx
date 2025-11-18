import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

const enableMocking = async () => {
  if (!import.meta.env.DEV || import.meta.env.MODE === 'test') {
    return
  }

  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find root element')
}

enableMocking().finally(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
})
