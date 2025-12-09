import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './client/App'

setTimeout(() => {
  createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
}, 6000)

